import React, { useState } from 'react'; // removed useEffect, useRef
import { Plus, Trash2, Download, Palette, FileText, User, Briefcase, GraduationCap, Code } from 'lucide-react';

// Custom hook for localStorage persistence
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Sample data for testing
const sampleData = {
  personalInfo: {
    fullName: 'Manideep Katkam',
    email: 'manideepkatkam83@gmail.com',
    phone: '+919666436747',
    address: 'Hyderabad, India',
    linkedin: 'www.linkedin.com/in/manideepkatkam',
    summary: 'Creative and detail-oriented Frontend Developer with hands-on experience in building responsive, user-friendly, and high-performance web applications. Proficient in HTML, CSS, JavaScript, React.js, and modern frontend frameworks, with a strong focus on clean UI/UX design and cross-browser compatibility. Skilled in integrating APIs, optimizing performance, and applying version control using Git/GitHub. Experienced in deploying projects on platforms like Vercel, Netlify, and Render. Adept at problem-solving, collaborating in team environments, and continuously learning new technologies to deliver scalable solutions.'
  },
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Hyderabad, India',
      startDate: '2021',
      endDate: '2025',
      gpa: '9.0'
    }
  ],
  experience: [
    {
      id: '1',
      title: 'Senior Software Developer',
      company: 'Tech Solutions Inc.',
      location: 'Hyderabad, India',
      startDate: '2022',
      endDate: 'Present',
      responsibilities: [
        'Led development of microservices architecture serving 1M+ users',
        'Improved application performance by 40% through code optimization',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      id: '2',
      title: 'Software Developer',
      company: 'Digital Innovations LLC',
      location: 'New York, NY',
      startDate: '2021',
      endDate: '2022',
      responsibilities: [
        'Developed and maintained React-based web applications',
        'Collaborated with design team to implement responsive UI components'
      ]
    }
  ],
  skills: [
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git'
  ]
};

// Resume Templates
const templates = {
  modern: {
    name: 'Modern',
    headerBg: 'bg-slate-800',
    accentColor: 'text-blue-600',
    sectionBg: 'bg-gray-50'
  },
  classic: {
    name: 'Classic',
    headerBg: 'bg-white border-b-2 border-gray-300',
    accentColor: 'text-gray-800',
    sectionBg: 'bg-white'
  },
  creative: {
    name: 'Creative',
    headerBg: 'bg-gradient-to-r from-purple-600 to-pink-600',
    accentColor: 'text-purple-600',
    sectionBg: 'bg-purple-50'
  }
};

// Input Components
const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      rows={4}
      {...props}
    />
  </div>
);

// Personal Info Form Component
const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <Input
          label="Phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <Input
          label="Address"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </div>
      <Input
        label="LinkedIn"
        value={data.linkedin}
        onChange={(e) => handleChange('linkedin', e.target.value)}
      />
      <Textarea
        label="Professional Summary"
        value={data.summary}
        onChange={(e) => handleChange('summary', e.target.value)}
      />
    </div>
  );
};

// Education Form Component
const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h3>
        <button
          onClick={addEducation}
          className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>
      
      {data.map((education, index) => (
        <div key={education.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Education #{index + 1}</h4>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Degree"
              value={education.degree}
              onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
            />
            <Input
              label="Institution"
              value={education.institution}
              onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
            />
            <Input
              label="Location"
              value={education.location}
              onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
            />
            <Input
              label="GPA (Optional)"
              value={education.gpa}
              onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
            />
            <Input
              label="Start Date"
              value={education.startDate}
              onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
            />
            <Input
              label="End Date"
              value={education.endDate}
              onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Experience Form Component
const ExperienceForm = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const updateResponsibility = (expId, index, value) => {
    onChange(data.map(exp => 
      exp.id === expId 
        ? { ...exp, responsibilities: exp.responsibilities.map((resp, i) => i === index ? value : resp) }
        : exp
    ));
  };

  const addResponsibility = (expId) => {
    onChange(data.map(exp => 
      exp.id === expId 
        ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
        : exp
    ));
  };

  const removeResponsibility = (expId, index) => {
    onChange(data.map(exp => 
      exp.id === expId 
        ? { ...exp, responsibilities: exp.responsibilities.filter((_, i) => i !== index) }
        : exp
    ));
  };

  const removeExperience = (id) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Work Experience
        </h3>
        <button
          onClick={addExperience}
          className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>
      
      {data.map((experience, index) => (
        <div key={experience.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Experience #{index + 1}</h4>
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Job Title"
              value={experience.title}
              onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
            />
            <Input
              label="Company"
              value={experience.company}
              onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
            />
            <Input
              label="Location"
              value={experience.location}
              onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Start Date"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
              />
              <Input
                label="End Date"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Key Responsibilities</label>
              <button
                onClick={() => addResponsibility(experience.id)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                + Add Responsibility
              </button>
            </div>
            
            {experience.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => updateResponsibility(experience.id, respIndex, e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your responsibility..."
                />
                {experience.responsibilities.length > 1 && (
                  <button
                    onClick={() => removeResponsibility(experience.id, respIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Skills Form Component
const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => { // changed from onKeyPress to onKeyDown
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Code className="w-5 h-5 mr-2" />
        Skills
      </h3>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown} // changed here
          placeholder="Add a skill..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <span
            key={index} // using index as key for safety
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Resume Preview Component
const ResumePreview = ({ data, template }) => {
  const { personalInfo, education, experience, skills } = data;
  const currentTemplate = templates[template];

  return (
    <div className="bg-white shadow-lg" style={{ minHeight: '11in', width: '8.5in' }} id="resume-preview">
      {/* Header */}
      <div className={`p-6 ${currentTemplate.headerBg} ${template === 'modern' ? 'text-white' : 'text-gray-800'}`}>
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {personalInfo.email && <div>📧 {personalInfo.email}</div>}
          {personalInfo.phone && <div>📱 {personalInfo.phone}</div>}
          {personalInfo.address && <div>📍 {personalInfo.address}</div>}
          {personalInfo.linkedin && <div>💼 {personalInfo.linkedin}</div>}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`text-xl font-bold mb-3 ${currentTemplate.accentColor} border-b-2 border-gray-200`}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && experience.some(exp => exp.title) && (
          <section>
            <h2 className={`text-xl font-bold mb-3 ${currentTemplate.accentColor} border-b-2 border-gray-200`}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.filter(exp => exp.title).map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className={`${currentTemplate.accentColor} font-medium`}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.responsibilities.filter(resp => resp).length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.responsibilities.filter(resp => resp).map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && education.some(edu => edu.degree) && (
          <section>
            <h2 className={`text-xl font-bold mb-3 ${currentTemplate.accentColor} border-b-2 border-gray-200`}>
              Education
            </h2>
            <div className="space-y-3">
              {education.filter(edu => edu.degree).map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className={`${currentTemplate.accentColor}`}>
                        {edu.institution} {edu.location && `• ${edu.location}`}
                      </p>
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className={`text-xl font-bold mb-3 ${currentTemplate.accentColor} border-b-2 border-gray-200`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${currentTemplate.sectionBg} ${currentTemplate.accentColor} border`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Main App Component
const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useLocalStorage('resumeData', sampleData);
  const [currentTemplate, setCurrentTemplate] = useLocalStorage('currentTemplate', 'modern');
  const [activeTab, setActiveTab] = useState('personal');

  const handlePersonalInfoChange = (newPersonalInfo) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: newPersonalInfo
    }));
  };

  const handleEducationChange = (newEducation) => {
    setResumeData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const handleExperienceChange = (newExperience) => {
    setResumeData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const handleSkillsChange = (newSkills) => {
    setResumeData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const loadSampleData = () => {
    setResumeData(sampleData);
  };

  const clearData = () => {
    const emptyData = {
      personalInfo: {
        fullName: '', email: '', phone: '', address: '', linkedin: '', summary: ''
      },
      education: [],
      experience: [],
      skills: []
    };
    setResumeData(emptyData);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Template Selector */}
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-gray-600" />
                <select
                  value={currentTemplate}
                  onChange={(e) => setCurrentTemplate(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(templates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={loadSampleData}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Load Sample
              </button>
              
              <button
                onClick={clearData}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear All
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="flex border-b">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'border-b-2 border-blue-500 text-blue-600'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={handlePersonalInfoChange}
                  />
                )}
                
                {activeTab === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={handleExperienceChange}
                  />
                )}
                
                {activeTab === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={handleEducationChange}
                  />
                )}
                
                {activeTab === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={handleSkillsChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-gray-200 p-4 rounded-lg">
              <div className="transform scale-75 origin-top-left" style={{ width: '133.33%' }}>
                <ResumePreview data={resumeData} template={currentTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          #resume-preview {
            transform: none !important;
            width: 100% !important;
            margin: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;