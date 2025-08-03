// Mock data service for assessment components

export const mockStudents = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@university.edu',
    studentId: 'ST001',
    status: 'active'
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@university.edu',
    studentId: 'ST002',
    status: 'active'
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@university.edu',
    studentId: 'ST003',
    status: 'active'
  }
]

export const mockAssignments = [
  {
    id: '1',
    title: 'Literature Review Assignment',
    description: 'Review 10 recent papers on machine learning in healthcare',
    dueDate: '2025-08-15',
    totalSubmissions: 8,
    gradedSubmissions: 5,
    maxScore: 100,
    type: 'written',
    rubric: [
      { criteria: 'Quality of Sources', maxPoints: 25 },
      { criteria: 'Analysis Depth', maxPoints: 25 },
      { criteria: 'Writing Quality', maxPoints: 25 },
      { criteria: 'Citations Format', maxPoints: 25 }
    ]
  },
  {
    id: '2',
    title: 'Research Methodology Proposal',
    description: 'Propose a methodology for your research project',
    dueDate: '2025-08-20',
    totalSubmissions: 8,
    gradedSubmissions: 2,
    maxScore: 100,
    type: 'written',
    rubric: [
      { criteria: 'Research Question', maxPoints: 30 },
      { criteria: 'Methodology Design', maxPoints: 40 },
      { criteria: 'Feasibility', maxPoints: 30 }
    ]
  }
]

export const mockSubmissions = [
  {
    id: '1',
    assignmentId: '1',
    studentId: '1',
    studentName: '张三',
    studentEmail: 'zhangsan@university.edu',
    submittedAt: '2025-08-14T10:30:00',
    fileName: 'literature_review_zhangsan.pdf',
    fileSize: '2.4 MB',
    status: 'graded',
    score: 85,
    feedback: 'Good analysis, but could improve citation format',
    plagiarismScore: 12,
    aiDetectionScore: 8
  },
  {
    id: '2',
    assignmentId: '1',
    studentId: '2',
    studentName: '李四',
    studentEmail: 'lisi@university.edu',
    submittedAt: '2025-08-15T09:15:00',
    fileName: 'literature_review_lisi.pdf',
    fileSize: '3.1 MB',
    status: 'pending',
    plagiarismScore: 5,
    aiDetectionScore: 3
  },
  {
    id: '3',
    assignmentId: '1',
    studentId: '3',
    studentName: '王五',
    studentEmail: 'wangwu@university.edu',
    submittedAt: '2025-08-15T14:20:00',
    fileName: 'literature_review_wangwu.pdf',
    fileSize: '2.8 MB',
    status: 'pending',
    plagiarismScore: 25,
    aiDetectionScore: 35
  }
]

export const mockReports = [
  {
    id: '1',
    studentId: '1',
    studentName: '张三',
    studentEmail: 'zhangsan@university.edu',
    title: 'Machine Learning Applications in Healthcare Diagnosis',
    type: 'milestone',
    milestone: 'Mid-term Report',
    submittedAt: '2025-08-10T14:30:00',
    fileName: 'midterm_report_zhangsan.pdf',
    fileSize: '4.2 MB',
    status: 'evaluated',
    version: 2,
    previousVersions: [
      {
        version: 1,
        submittedAt: '2025-08-05T10:00:00',
        feedback: 'Good start, but needs more depth in methodology section'
      }
    ],
    evaluation: {
      overallScore: 82,
      criteriaScores: {
        research_quality: 20,
        technical_execution: 21,
        communication: 19,
        impact_significance: 22
      },
      strengths: 'Strong technical approach and good understanding of ML algorithms',
      improvements: 'Need to improve literature review and add more recent references',
      recommendations: 'Consider expanding the dataset and exploring additional algorithms',
      evaluatedBy: 'Prof. Zhang',
      evaluatedAt: '2025-08-12T16:45:00'
    }
  },
  {
    id: '2',
    studentId: '2',
    studentName: '李四',
    studentEmail: 'lisi@university.edu',
    title: 'Deep Learning for Medical Image Analysis',
    type: 'milestone',
    milestone: 'Mid-term Report',
    submittedAt: '2025-08-11T09:15:00',
    fileName: 'midterm_report_lisi.pdf',
    fileSize: '3.8 MB',
    status: 'pending',
    version: 1,
    previousVersions: []
  },
  {
    id: '3',
    studentId: '1',
    studentName: '张三',
    studentEmail: 'zhangsan@university.edu',
    title: 'Final Research Report - ML Healthcare Applications',
    type: 'final',
    milestone: 'Final Report',
    submittedAt: '2025-08-15T16:00:00',
    fileName: 'final_report_zhangsan.pdf',
    fileSize: '8.1 MB',
    status: 'pending',
    version: 1,
    previousVersions: []
  }
]

export const mockPresentations = [
  {
    id: '1',
    studentId: '1',
    studentName: '张三',
    studentEmail: 'zhangsan@university.edu',
    title: 'Machine Learning Applications in Healthcare Diagnosis',
    type: 'defense',
    scheduledDate: '2025-08-20T10:00:00',
    duration: 30,
    location: 'Conference Room A',
    status: 'completed',
    actualDuration: 28,
    scores: {
      content_quality: 22,
      presentation_skills: 18,
      visual_aids: 13,
      time_management: 9,
      qa_handling: 17,
      innovation_impact: 8
    },
    totalScore: 87,
    feedback: 'Excellent technical content and good presentation skills. Could improve visual aids.',
    questions: [
      {
        question: 'How does your approach compare to existing methods?',
        response: 'Provided detailed comparison with benchmark studies',
        score: 4
      },
      {
        question: 'What are the limitations of your dataset?',
        response: 'Acknowledged limitations and discussed mitigation strategies',
        score: 5
      }
    ],
    evaluatedBy: 'Prof. Zhang',
    evaluatedAt: '2025-08-20T10:35:00'
  },
  {
    id: '2',
    studentId: '2',
    studentName: '李四',
    studentEmail: 'lisi@university.edu',
    title: 'Deep Learning for Medical Image Analysis',
    type: 'progress',
    scheduledDate: '2025-08-22T14:00:00',
    duration: 20,
    location: 'Virtual - Zoom',
    status: 'scheduled'
  },
  {
    id: '3',
    studentId: '3',
    studentName: '王五',
    studentEmail: 'wangwu@university.edu',
    title: 'Natural Language Processing for Clinical Notes',
    type: 'defense',
    scheduledDate: '2025-08-25T09:00:00',
    duration: 30,
    location: 'Conference Room B',
    status: 'scheduled'
  }
]

export const mockGradingData = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@university.edu',
    studentId: 'ST001',
    status: 'active',
    assessments: {
      homework: [
        { title: 'Literature Review', score: 85, maxScore: 100, weight: 0.4 },
        { title: 'Methodology Design', score: 88, maxScore: 100, weight: 0.6 }
      ],
      midtermReport: {
        score: 82,
        maxScore: 100,
        submittedAt: '2025-08-10',
        evaluatedBy: 'Prof. Zhang'
      },
      finalReport: {
        score: 87,
        maxScore: 100,
        submittedAt: '2025-08-20',
        evaluatedBy: 'Prof. Zhang'
      },
      presentation: {
        score: 89,
        maxScore: 100,
        presentedAt: '2025-08-22',
        evaluatedBy: 'Prof. Zhang'
      }
    },
    attendance: {
      total: 16,
      attended: 15,
      percentage: 93.75
    },
    finalGrade: null,
    gradeStatus: 'pending',
    lastUpdated: null
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@university.edu',
    studentId: 'ST002',
    status: 'active',
    assessments: {
      homework: [
        { title: 'Literature Review', score: 78, maxScore: 100, weight: 0.4 },
        { title: 'Methodology Design', score: 82, maxScore: 100, weight: 0.6 }
      ],
      midtermReport: {
        score: 75,
        maxScore: 100,
        submittedAt: '2025-08-11',
        evaluatedBy: 'Prof. Zhang'
      },
      finalReport: {
        score: 80,
        maxScore: 100,
        submittedAt: '2025-08-21',
        evaluatedBy: 'Prof. Zhang'
      },
      presentation: {
        score: 85,
        maxScore: 100,
        presentedAt: '2025-08-23',
        evaluatedBy: 'Prof. Zhang'
      }
    },
    attendance: {
      total: 16,
      attended: 14,
      percentage: 87.5
    },
    finalGrade: 80.2,
    gradeStatus: 'submitted',
    lastUpdated: '2025-08-24T10:30:00'
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@university.edu',
    studentId: 'ST003',
    status: 'active',
    assessments: {
      homework: [
        { title: 'Literature Review', score: 92, maxScore: 100, weight: 0.4 },
        { title: 'Methodology Design', score: 90, maxScore: 100, weight: 0.6 }
      ],
      midtermReport: {
        score: 88,
        maxScore: 100,
        submittedAt: '2025-08-09',
        evaluatedBy: 'Prof. Zhang'
      },
      finalReport: {
        score: 92,
        maxScore: 100,
        submittedAt: '2025-08-19',
        evaluatedBy: 'Prof. Zhang'
      },
      presentation: {
        score: 94,
        maxScore: 100,
        presentedAt: '2025-08-21',
        evaluatedBy: 'Prof. Zhang'
      }
    },
    attendance: {
      total: 16,
      attended: 16,
      percentage: 100
    },
    finalGrade: null,
    gradeStatus: 'pending',
    lastUpdated: null
  }
]

export const mockCollaborators = [
  {
    id: '1',
    name: 'Dr. Wang',
    role: 'Co-supervisor',
    email: 'wang@university.edu',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Liu',
    role: 'External Examiner',
    email: 'liu@external.edu',
    status: 'invited'
  }
]

// Evaluation criteria for reports
export const evaluationCriteria = [
  {
    id: 'research_quality',
    name: 'Research Quality',
    description: 'Depth and rigor of research methodology',
    maxScore: 25,
    subcriteria: [
      'Literature review comprehensiveness',
      'Research design appropriateness',
      'Data collection methodology',
      'Analysis rigor'
    ]
  },
  {
    id: 'technical_execution',
    name: 'Technical Execution',
    description: 'Technical skills and implementation quality',
    maxScore: 25,
    subcriteria: [
      'Technical approach',
      'Implementation quality',
      'Problem-solving skills',
      'Innovation and creativity'
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Written communication and presentation of findings',
    maxScore: 25,
    subcriteria: [
      'Clarity of writing',
      'Structure and organization',
      'Use of figures and tables',
      'Academic language usage'
    ]
  },
  {
    id: 'impact_significance',
    name: 'Impact & Significance',
    description: 'Contribution to field and potential impact',
    maxScore: 25,
    subcriteria: [
      'Novelty of contribution',
      'Practical significance',
      'Future research potential',
      'Industry relevance'
    ]
  }
]

// Scoring criteria for presentations
export const scoringCriteria = [
  {
    id: 'content_quality',
    name: 'Content Quality',
    description: 'Accuracy, depth, and relevance of content',
    maxScore: 25,
    subcriteria: [
      'Research depth and accuracy',
      'Problem understanding',
      'Solution appropriateness',
      'Technical competence'
    ]
  },
  {
    id: 'presentation_skills',
    name: 'Presentation Skills',
    description: 'Communication effectiveness and delivery',
    maxScore: 20,
    subcriteria: [
      'Clarity of explanation',
      'Voice and pace',
      'Eye contact and engagement',
      'Confidence and composure'
    ]
  },
  {
    id: 'visual_aids',
    name: 'Visual Aids & Materials',
    description: 'Quality and effectiveness of slides and demonstrations',
    maxScore: 15,
    subcriteria: [
      'Slide design and clarity',
      'Use of figures and diagrams',
      'Demonstration quality',
      'Supporting materials'
    ]
  },
  {
    id: 'time_management',
    name: 'Time Management',
    description: 'Adherence to time limits and structure',
    maxScore: 10,
    subcriteria: [
      'Time allocation',
      'Pacing throughout presentation',
      'Conclusion within time limit',
      'Introduction effectiveness'
    ]
  },
  {
    id: 'qa_handling',
    name: 'Q&A Handling',
    description: 'Response to questions and discussion',
    maxScore: 20,
    subcriteria: [
      'Understanding of questions',
      'Quality of responses',
      'Ability to defend methodology',
      'Handling of criticism'
    ]
  },
  {
    id: 'innovation_impact',
    name: 'Innovation & Impact',
    description: 'Novelty and potential impact of work',
    maxScore: 10,
    subcriteria: [
      'Originality of approach',
      'Potential for impact',
      'Future research directions',
      'Practical applications'
    ]
  }
]

// Utility functions
export const getPlagiarismStatus = (score) => {
  if (score < 15) return { color: '#27ae60', label: 'Low Risk' }
  if (score < 30) return { color: '#f39c12', label: 'Medium Risk' }
  return { color: '#e74c3c', label: 'High Risk' }
}

export const getAIDetectionStatus = (score) => {
  if (score < 20) return { color: '#27ae60', label: 'Human-written' }
  if (score < 50) return { color: '#f39c12', label: 'Possibly AI' }
  return { color: '#e74c3c', label: 'Likely AI' }
}

export const getGradeColor = (grade) => {
  if (grade >= 90) return '#27ae60'
  if (grade >= 80) return '#3498db'
  if (grade >= 70) return '#f39c12'
  if (grade >= 60) return '#e67e22'
  return '#e74c3c'
}

export const getLetterGrade = (numericGrade) => {
  if (numericGrade >= 90) return 'A'
  if (numericGrade >= 80) return 'B'
  if (numericGrade >= 70) return 'C'
  if (numericGrade >= 60) return 'D'
  return 'F'
}

export const calculateHomeworkAverage = (homework) => {
  if (!homework || homework.length === 0) return 0
  const totalWeightedScore = homework.reduce((sum, hw) => sum + (hw.score * hw.weight), 0)
  return totalWeightedScore
}

export const calculateFinalGrade = (student, gradingConfig) => {
  const defaultConfig = {
    homework: 20,
    midtermReport: 25,
    finalReport: 30,
    presentation: 25
  }
  
  const config = gradingConfig || defaultConfig
  const homeworkAvg = calculateHomeworkAverage(student.assessments.homework)
  const midtermScore = student.assessments.midtermReport?.score || 0
  const finalReportScore = student.assessments.finalReport?.score || 0
  const presentationScore = student.assessments.presentation?.score || 0

  return (
    homeworkAvg * (config.homework / 100) +
    midtermScore * (config.midtermReport / 100) +
    finalReportScore * (config.finalReport / 100) +
    presentationScore * (config.presentation / 100)
  )
}