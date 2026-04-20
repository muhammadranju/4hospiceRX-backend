import { Leads } from '../leads/leads.model';
import { Tools } from '../tools/tools.model';
import { User } from '../user/user.model';

const getAllUsersLeadsFromDB = async () => {
  const result = await User.find().sort({ createdAt: -1 });
  return result;
};

const getStatisticsFromDB = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  // Users statistics
  const totalUsers = await User.countDocuments();
  const usersLast30Days = await User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const usersPrevious30Days = await User.countDocuments({
    createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
  });
  const userGrowth =
    usersPrevious30Days === 0
      ? 100
      : ((usersLast30Days - usersPrevious30Days) / usersPrevious30Days) * 100;

  // Leads statistics
  const totalLeads = await Leads.countDocuments();
  const leadsLast30Days = await Leads.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const leadsPrevious30Days = await Leads.countDocuments({
    createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
  });
  const leadGrowth =
    leadsPrevious30Days === 0
      ? 100
      : ((leadsLast30Days - leadsPrevious30Days) / leadsPrevious30Days) * 100;

  // Tools statistics
  const totalTools = await Tools.countDocuments();
  const totalActiveTools = await Tools.countDocuments({ status: 'active' });

  // Top Tool Usage
  const topTool = await Tools.findOne({ status: 'active' }).sort({
    totalUse: -1,
  });

  // Lead Conversion Rate
  const leadConversionRate =
    totalUsers === 0 ? 0 : (totalLeads / totalUsers) * 100;
  // For conversion rate growth, we compare current rate with previous rate
  const prevUsers = await User.countDocuments({ createdAt: { $lt: thirtyDaysAgo } });
  const prevLeads = await Leads.countDocuments({ createdAt: { $lt: thirtyDaysAgo } });
  const prevConversionRate = prevUsers === 0 ? 0 : (prevLeads / prevUsers) * 100;
  const conversionRateGrowth = leadConversionRate - prevConversionRate;

  return {
    users: {
      total: totalUsers,
      growth: userGrowth.toFixed(1),
    },
    leads: {
      total: totalLeads,
      growth: leadGrowth.toFixed(1),
    },
    activeTools: {
      active: totalActiveTools,
      total: totalTools,
    },
    topTool: {
      name: topTool?.toolName || 'N/A',
      usage: topTool?.totalUse || 0,
      growth: '+8.2', // This would ideally need historical usage tracking
    },
    conversionRate: {
      rate: leadConversionRate.toFixed(1),
      growth: conversionRateGrowth.toFixed(1),
    },
  };
};

const getToolUsageStats = async () => {
  const result = await Tools.find({ status: 'active' })
    .select('toolName totalUse')
    .sort({ totalUse: -1 });
  return result;
};

const getUserAndLeadGrowth = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const userAggregation = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const leadAggregation = await Leads.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Get initial counts before the 30-day period
  const initialUserCount = await User.countDocuments({
    createdAt: { $lt: thirtyDaysAgo },
  });
  const initialLeadCount = await Leads.countDocuments({
    createdAt: { $lt: thirtyDaysAgo },
  });

  // Combine results for the last 30 days with cumulative totals
  const growthData = [];
  let cumulativeUsers = initialUserCount;
  let cumulativeLeads = initialLeadCount;

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    const userCount =
      userAggregation.find(u => u._id === dateString)?.count || 0;
    const leadCount =
      leadAggregation.find(l => l._id === dateString)?.count || 0;

    cumulativeUsers += userCount;
    cumulativeLeads += leadCount;

    growthData.push({
      date: dateString,
      day: `Day ${30 - i}`,
      users: cumulativeUsers,
      leads: cumulativeLeads,
    });
  }

  return growthData;
};

export const AnalyticsService = {
  getAllUsersLeadsFromDB,
  getStatisticsFromDB,
  getToolUsageStats,
  getUserAndLeadGrowth,
};
