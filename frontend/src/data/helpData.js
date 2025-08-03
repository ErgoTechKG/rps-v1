// Help content data organized by categories and roles
export const helpCategories = [
  {
    id: 'getting-started',
    name: '快速入门',
    icon: '🚀',
    description: '新用户入门指南'
  },
  {
    id: 'user-guides',
    name: '用户指南',
    icon: '📖',
    description: '详细的功能使用说明'
  },
  {
    id: 'features',
    name: '功能参考',
    icon: '⚙️',
    description: '所有功能的详细说明'
  },
  {
    id: 'troubleshooting',
    name: '故障排除',
    icon: '🔧',
    description: '常见问题解决方案'
  },
  {
    id: 'updates',
    name: '更新日志',
    icon: '📝',
    description: '新功能和系统更新'
  }
]

export const helpArticles = {
  // Getting Started articles
  'getting-started': [
    {
      id: 'login-guide',
      title: '如何登录系统',
      category: 'getting-started',
      roles: ['professor', 'student', 'secretary', 'leader'],
      tags: ['登录', '认证', '基础'],
      lastUpdated: '2025-08-03',
      content: `
# 如何登录系统

## 登录步骤

1. **访问登录页面**
   - 在浏览器中输入系统地址
   - 等待页面加载完成

2. **输入登录信息**
   - 用户名：使用您的账号或邮箱
   - 密码：输入您的密码
   - 记住我：可选择是否保持登录状态

3. **完成登录**
   - 点击"登录"按钮
   - 系统会自动跳转到您的角色专属界面

## 测试账号（仅限开发环境）

- **教授账号**: professor1 / password123
- **学生账号**: student1 / password123  
- **秘书账号**: secretary1 / password123
- **领导账号**: leader1 / password123

## 常见问题

**Q: 忘记密码怎么办？**
A: 请联系系统管理员重置密码。

**Q: 登录后看不到预期的界面？**
A: 请确认您的账号角色是否正确。
      `
    },
    {
      id: 'dashboard-overview',
      title: '仪表盘概览',
      category: 'getting-started',
      roles: ['professor', 'student', 'secretary', 'leader'],
      tags: ['仪表盘', '界面', '导航'],
      lastUpdated: '2025-08-03',
      content: `
# 仪表盘概览

## 主要区域介绍

### 顶部导航栏
- **品牌标识**: 显示大学logo和平台名称
- **主菜单**: 基于您的角色显示相关功能菜单
- **工具栏**: 搜索、通知、日历、帮助等快捷功能
- **用户菜单**: 个人资料、设置、退出登录

### 面包屑导航
- 显示当前页面在系统中的位置
- 可点击返回上级页面

### 主内容区域
- 根据您的角色显示相关的数据卡片
- 快速操作按钮
- 重要信息提醒

## 不同角色的仪表盘特色

### 教授仪表盘 👨‍🏫
- 课程管理卡片
- 学生进度概览
- 待办任务提醒
- AI工具快捷入口

### 学生仪表盘 👨‍🎓
- 学习进度跟踪
- 课程资料快速访问
- 作业提交状态
- 成绩查询

### 秘书仪表盘 👩‍💼
- 系统监控概览
- 流程管理状态
- 数据收集进度
- 报告生成工具

### 领导仪表盘 👨‍💼
- 关键绩效指标
- 决策支持数据
- 系统整体状况
- 战略目标进展
      `
    }
  ],

  // User Guides
  'user-guides': [
    {
      id: 'professor-course-management',
      title: '教授：课程管理指南',
      category: 'user-guides',
      roles: ['professor'],
      tags: ['课程', '管理', '教授'],
      lastUpdated: '2025-08-03',
      content: `
# 教授：课程管理指南

## 创建新课程

1. 进入课程管理页面
2. 点击"创建新课程"按钮
3. 填写课程基本信息：
   - 课程名称
   - 课程代码
   - 学分
   - 学期信息
   - 课程描述
4. 设置课程参数和要求
5. 保存并发布课程

## 管理学生

### 添加学生
- 通过学号批量导入
- 手动添加单个学生
- 审核学生申请

### 学生评估
- 设置评分标准
- 记录学习进度
- 生成评估报告

## 课程内容管理

### 上传资料
- 支持多种文件格式
- 设置访问权限
- 版本控制

### 作业管理
- 创建作业任务
- 设置截止时间
- 批量评分功能
      `
    },
    {
      id: 'student-course-enrollment',
      title: '学生：课程选课指南',
      category: 'user-guides',
      roles: ['student'],
      tags: ['选课', '学习', '学生'],
      lastUpdated: '2025-08-03',
      content: `
# 学生：课程选课指南

## 浏览可选课程

1. 进入课程浏览页面
2. 使用筛选条件：
   - 学期选择
   - 专业领域
   - 学分要求
   - 上课时间
3. 查看课程详情和教授信息

## 申请课程

### 提交申请
1. 点击"申请课程"按钮
2. 填写申请表格：
   - 申请理由
   - 学习目标
   - 相关背景
3. 上传必要材料
4. 提交等待审核

### 申请状态跟踪
- 实时查看审核进度
- 接收状态更新通知
- 处理教授反馈

## 学习过程管理

### 课程资料
- 下载课程文档
- 观看视频资料
- 参与在线讨论

### 作业提交
- 按时提交作业
- 查看评分反馈
- 申请重新提交

### 进度跟踪
- 学习进度可视化
- 目标达成情况
- 改进建议
      `
    }
  ],

  // Features Reference
  'features': [
    {
      id: 'notification-system',
      title: '通知系统使用说明',
      category: 'features',
      roles: ['professor', 'student', 'secretary', 'leader'],
      tags: ['通知', '消息', '设置'],
      lastUpdated: '2025-08-03',
      content: `
# 通知系统使用说明

## 通知中心

### 访问通知
- 点击顶部导航栏的铃铛图标
- 查看未读通知数量显示
- 浏览所有通知历史

### 通知类型
- **消息通知**: 私信和聊天
- **截止日期**: 作业和任务提醒
- **系统警报**: 重要系统消息
- **状态更新**: 申请和审核结果

## 通知设置

### 接收偏好
1. 进入通知设置页面
2. 选择接收方式：
   - 应用内通知
   - 邮件通知
   - 短信通知（如支持）
3. 设置通知频率
4. 选择重要性级别

### 角色特定通知

#### 教授
- 学生提交作业
- 课程申请审核
- 评估截止提醒
- AI检测结果

#### 学生
- 作业截止日期
- 成绩发布
- 课程通知
- 申请状态更新

#### 秘书
- 系统监控警报
- 数据收集状态
- 报告生成完成
- 用户管理事件

#### 领导
- 关键指标变化
- 重要系统事件
- 决策支持更新
- 战略目标进展
      `
    },
    {
      id: 'calendar-features',
      title: '日历系统功能说明',
      category: 'features',
      roles: ['professor', 'student', 'secretary', 'leader'],
      tags: ['日历', '日程', '提醒'],
      lastUpdated: '2025-08-03',
      content: `
# 日历系统功能说明

## 日历视图

### 切换视图模式
- **月视图**: 查看整月安排
- **周视图**: 详细周程安排
- **日视图**: 当日详细时间表
- **列表视图**: 事件列表形式

## 创建事件

### 基本信息
1. 点击日期或时间段
2. 输入事件标题
3. 设置开始和结束时间
4. 选择事件类型
5. 添加描述和位置

### 高级设置
- **重复设置**: 每日、每周、每月等
- **提醒设置**: 提前通知时间
- **参与者**: 邀请其他用户
- **权限**: 公开或私有事件

## 事件管理

### 编辑事件
- 双击事件进行编辑
- 拖拽调整时间
- 删除不需要的事件

### 事件分类
- **课程**: 上课时间安排
- **会议**: 各类会议安排  
- **截止日期**: 重要时间节点
- **个人**: 私人事务安排
- **系统**: 系统维护等

## 共享与协作

### 事件共享
- 邀请参与者
- 设置访问权限
- 发送邀请通知

### 日历订阅
- 订阅其他用户日历
- 导出日历数据
- 同步外部日历
      `
    }
  ],

  // Troubleshooting
  'troubleshooting': [
    {
      id: 'login-issues',
      title: '登录问题解决',
      category: 'troubleshooting',
      roles: ['professor', 'student', 'secretary', 'leader'],
      tags: ['登录', '问题', '解决'],
      lastUpdated: '2025-08-03',
      content: `
# 登录问题解决

## 常见登录问题

### 密码错误
**问题**: 提示密码不正确
**解决方案**:
1. 确认大小写锁定状态
2. 检查输入是否正确
3. 尝试重新输入密码
4. 如确定密码正确，联系管理员

### 账号被锁定
**问题**: 提示账号已被锁定
**解决方案**:
1. 等待锁定时间结束（通常15分钟）
2. 联系系统管理员解锁
3. 确认没有恶意登录尝试

### 网络连接问题
**问题**: 无法连接到服务器
**解决方案**:
1. 检查网络连接状态
2. 尝试刷新页面
3. 清除浏览器缓存
4. 更换网络环境测试

## 浏览器兼容性

### 推荐浏览器
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 清除缓存步骤
1. 按 Ctrl+Shift+Delete (Windows) 或 Cmd+Shift+Delete (Mac)
2. 选择时间范围
3. 勾选"缓存的图像和文件"
4. 点击"删除数据"

## 联系支持

如果问题仍未解决，请联系技术支持：
- 邮箱: support@university.edu
- 电话: 400-xxx-xxxx
- 在线客服: 工作日 9:00-18:00
      `
    },
    {
      id: 'performance-issues',
      title: '系统性能问题',
      category: 'troubleshooting',
      roles: ['secretary', 'leader'],
      tags: ['性能', '优化', '系统'],
      lastUpdated: '2025-08-03',
      content: `
# 系统性能问题

## 页面加载缓慢

### 可能原因
- 网络连接质量差
- 浏览器缓存过多
- 系统负载过高
- 大量数据处理

### 解决方案
1. **检查网络**:
   - 测试网络速度
   - 尝试其他网站验证
   - 联系网络服务提供商

2. **优化浏览器**:
   - 清除浏览器缓存
   - 关闭不必要的标签页
   - 禁用不需要的浏览器插件

3. **系统优化**:
   - 避免高峰期使用
   - 分批处理大量数据
   - 联系系统管理员

## 数据处理延迟

### 大数据报告生成
**问题**: 报告生成时间过长
**解决方案**:
1. 缩小数据范围
2. 使用数据筛选
3. 分批次生成报告
4. 安排非高峰期处理

### 批量操作优化
**问题**: 批量操作响应慢
**解决方案**:
1. 减少单次操作数量
2. 使用分页处理
3. 避免同时进行多个批量操作

## 系统监控

### 性能指标监控
- CPU使用率
- 内存使用情况
- 数据库响应时间
- 网络延迟

### 预警机制
- 设置性能阈值
- 自动告警通知
- 定期性能报告
      `
    }
  ],

  // Updates
  'updates': [
    {
      id: 'v1-5-release',
      title: '版本 1.5 更新说明',
      category: 'updates',
      roles: ['professor', 'student', 'secretary', 'leader'],
      tags: ['更新', '新功能', '版本'],
      lastUpdated: '2025-08-03',
      content: `
# 版本 1.5 更新说明

## 新增功能

### 🎉 帮助文档系统
- 全新的帮助中心界面
- 角色基础的内容筛选
- 强大的搜索功能
- 常见问题解答

### 📅 日历系统增强
- 新增列表视图模式
- 改进的事件编辑体验
- 更好的时区支持
- 批量事件操作

### 🔔 通知系统优化
- 新的通知分类
- 批量操作功能
- 改进的筛选选项
- 更直观的设置界面

## 功能改进

### 用户界面
- 更现代的设计风格
- 改进的响应式布局
- 更好的色彩对比度
- 优化的移动端体验

### 性能优化
- 页面加载速度提升 30%
- 减少内存使用
- 优化数据库查询
- 更高效的缓存机制

### 安全性增强
- 更强的密码策略
- 会话管理改进
- 审计日志增强
- 安全漏洞修复

## 修复的问题

### 登录系统
- 修复偶发的登录失败问题
- 改进错误消息显示
- 解决会话超时问题

### 数据同步
- 修复数据不一致问题
- 改进实时更新机制
- 解决并发访问冲突

## 下个版本预告

### 计划新功能
- AI智能助手集成
- 高级分析报告
- 移动应用支持
- 第三方系统集成

### 预计发布时间
- 版本 1.6: 2025年9月
- 版本 2.0: 2025年12月

## 升级说明

本次更新将自动应用，无需用户手动操作。如遇到问题，请联系技术支持。
      `
    }
  ]
}

export const faqData = [
  {
    id: 'faq-001',
    question: '如何重置密码？',
    answer: '目前系统暂不支持用户自主重置密码。如需重置密码，请联系系统管理员或发送邮件到 support@university.edu。管理员会在24小时内为您重置密码并通过安全方式发送新密码。',
    category: 'account',
    roles: ['professor', 'student', 'secretary', 'leader'],
    tags: ['密码', '重置', '账号']
  },
  {
    id: 'faq-002',
    question: '系统支持哪些浏览器？',
    answer: '系统支持所有现代浏览器，推荐使用：Chrome 80+、Firefox 75+、Safari 13+、Edge 80+。为了获得最佳体验，请保持浏览器版本更新，并启用JavaScript。',
    category: 'technical',
    roles: ['professor', 'student', 'secretary', 'leader'],
    tags: ['浏览器', '兼容性', '技术']
  },
  {
    id: 'faq-003',
    question: '如何联系技术支持？',
    answer: '您可以通过以下方式联系技术支持：1) 发送邮件到 support@university.edu；2) 拨打支持热线 400-xxx-xxxx（工作日 9:00-18:00）；3) 使用系统内的在线客服功能。',
    category: 'support',
    roles: ['professor', 'student', 'secretary', 'leader'],
    tags: ['支持', '联系', '帮助']
  },
  {
    id: 'faq-004',
    question: '教授如何创建新课程？',
    answer: '教授可以通过以下步骤创建课程：1) 登录后进入"课程管理"页面；2) 点击"创建新课程"按钮；3) 填写课程基本信息（名称、代码、学分等）；4) 设置课程要求和评分标准；5) 保存并发布课程。',
    category: 'course',
    roles: ['professor'],
    tags: ['课程', '创建', '教授']
  },
  {
    id: 'faq-005',
    question: '学生如何申请课程？',
    answer: '学生申请课程的步骤：1) 进入"课程浏览"页面；2) 使用筛选条件查找合适的课程；3) 查看课程详情和要求；4) 点击"申请课程"按钮；5) 填写申请表格和上传必要材料；6) 提交申请等待教授审核。',
    category: 'course',
    roles: ['student'],
    tags: ['申请', '课程', '学生']
  },
  {
    id: 'faq-006',
    question: '秘书如何生成系统报告？',
    answer: '秘书生成报告的步骤：1) 进入"数据报告"页面；2) 选择报告类型和数据范围；3) 设置筛选条件和参数；4) 点击"生成报告"按钮；5) 等待处理完成后下载报告。大型报告可能需要几分钟处理时间。',
    category: 'reporting',
    roles: ['secretary'],
    tags: ['报告', '数据', '秘书']
  },
  {
    id: 'faq-007',
    question: '领导如何查看系统整体状况？',
    answer: '领导可以通过"决策仪表盘"查看系统整体状况：1) 登录后自动进入领导仪表盘；2) 查看关键绩效指标卡片；3) 点击"执行概览"查看详细数据；4) 使用"AI洞察"获取数据分析建议；5) 定期查看系统报告。',
    category: 'analytics',
    roles: ['leader'],
    tags: ['仪表盘', '分析', '领导']
  },
  {
    id: 'faq-008',
    question: '如何设置通知偏好？',
    answer: '设置通知偏好的步骤：1) 点击顶部导航栏的通知图标；2) 点击"设置"按钮进入通知设置页面；3) 选择接收方式（应用内、邮件等）；4) 设置通知类型和频率；5) 保存设置。您可以随时修改这些设置。',
    category: 'notifications',
    roles: ['professor', 'student', 'secretary', 'leader'],
    tags: ['通知', '设置', '偏好']
  },
  {
    id: 'faq-009',
    question: '日历事件可以与其他用户共享吗？',
    answer: '是的，日历事件支持共享功能：1) 创建或编辑事件时；2) 在"参与者"部分添加其他用户；3) 设置事件访问权限（查看或编辑）；4) 保存后系统会自动发送邀请通知。受邀用户可以接受或拒绝邀请。',
    category: 'calendar',
    roles: ['professor', 'student', 'secretary', 'leader'],
    tags: ['日历', '共享', '协作']
  },
  {
    id: 'faq-010',
    question: '系统数据多久备份一次？',
    answer: '系统采用多重备份策略：1) 实时数据备份到云端；2) 每日完整数据库备份；3) 每周系统镜像备份；4) 每月离线存储备份。所有备份都经过加密处理，确保数据安全。用户无需担心数据丢失问题。',
    category: 'data',
    roles: ['secretary', 'leader'],
    tags: ['备份', '数据', '安全']
  }
]

// Search function to find relevant articles
export const searchHelpContent = (query, userRole = null) => {
  if (!query || query.trim() === '') return []
  
  const searchTerm = query.toLowerCase().trim()
  const results = []
  
  // Search through all articles
  Object.values(helpArticles).flat().forEach(article => {
    // Check if article is relevant to user role
    if (userRole && !article.roles.includes(userRole)) return
    
    // Search in title, tags, and content
    const titleMatch = article.title.toLowerCase().includes(searchTerm)
    const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    const contentMatch = article.content.toLowerCase().includes(searchTerm)
    
    if (titleMatch || tagMatch || contentMatch) {
      let score = 0
      if (titleMatch) score += 10
      if (tagMatch) score += 5
      if (contentMatch) score += 1
      
      results.push({ ...article, score })
    }
  })
  
  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.score - a.score)
}

// Get articles by category and role
export const getArticlesByCategory = (categoryId, userRole = null) => {
  const articles = helpArticles[categoryId] || []
  if (!userRole) return articles
  
  return articles.filter(article => article.roles.includes(userRole))
}

// Get FAQ by role
export const getFAQByRole = (userRole = null) => {
  if (!userRole) return faqData
  return faqData.filter(faq => faq.roles.includes(userRole))
}