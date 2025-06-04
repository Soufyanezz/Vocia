import { useState } from 'react'
import { CheckCircle, AlertCircle, FileText, Download, Users, Shield, Eye, Database, Copy, X, Building, Calendar, Plus, LogOut } from 'lucide-react'
import vociaLogo from './assets/new-vocia-logo.png'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [generatedReport, setGeneratedReport] = useState('')
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Système de Recommandation IA",
      description: "Système d'IA pour recommandations produits e-commerce",
      riskLevel: "high",
      status: "active",
      createdAt: "2024-01-15",
      assessmentData: {
        systemName: "Système de Recommandation IA",
        version: "v2.1.0",
        purpose: "Recommandations produits personnalisées pour améliorer l'expérience client et augmenter les ventes.",
        users: "Clients finaux de la plateforme e-commerce, administrateurs marketing.",
        riskCategory: "Systèmes d'IA utilisés dans l'emploi, la gestion des travailleurs et l'accès au travail indépendant (Annexe III, point 5)",
        justification: "Le système influence les opportunités économiques des clients et peut avoir un impact significatif sur leurs décisions d'achat.",
        dataGovernance: "Politique interne de gouvernance des données, conforme au RGPD avec consentement utilisateur explicite.",
        trainingDataSources: "Données comportementales clients, historique d'achats, préférences produits, données démographiques anonymisées.",
        testingProcedures: "Tests statistiques réguliers (Aequitas, Fairlearn) pour détecter les biais, validation croisée, tests A/B.",
        performanceMetrics: "Précision: 85%, Rappel: 78%, F1-score: 81%, Taux de Clic (CTR): 12%, Taux de Conversion: 8%.",
        humanInterventionMethod: "Interface administrateur permettant de désactiver/modifier les recommandations, API interne pour interventions.",
        auditTrailFunctionality: "Système de logging centralisé enregistrant toutes les actions et décisions avec timestamp, utilisateur, action, détails.",
        signedBy: "Alice Dupont",
        date: "2024-05-15"
      }
    }
  ])

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    riskLevel: 'minimal'
  })

  const [assessmentData, setAssessmentData] = useState({
    systemName: '',
    version: '',
    purpose: '',
    users: '',
    riskCategory: '',
    justification: '',
    dataGovernance: '',
    trainingDataSources: '',
    testingProcedures: '',
    performanceMetrics: '',
    humanInterventionMethod: '',
    auditTrailFunctionality: '',
    signedBy: '',
    date: new Date().toISOString().split('T')[0]
  })

  const [completionStatus, setCompletionStatus] = useState({})

  // Étapes basées sur le prototype original
  const steps = [
    {
      id: 'system',
      title: 'Description du Système',
      icon: <FileText className="w-5 h-5" />,
      fields: ['systemName', 'version', 'purpose', 'users']
    },
    {
      id: 'risk',
      title: 'Catégorie de Risque',
      icon: <AlertCircle className="w-5 h-5" />,
      fields: ['riskCategory', 'justification']
    },
    {
      id: 'technical',
      title: 'Documentation Technique',
      icon: <Database className="w-5 h-5" />,
      fields: ['dataGovernance', 'trainingDataSources', 'testingProcedures', 'performanceMetrics']
    },
    {
      id: 'oversight',
      title: 'Supervision Humaine',
      icon: <Eye className="w-5 h-5" />,
      fields: ['humanInterventionMethod', 'auditTrailFunctionality']
    },
    {
      id: 'declaration',
      title: 'Déclaration de Conformité',
      icon: <Shield className="w-5 h-5" />,
      fields: ['signedBy', 'date']
    }
  ]

  // Catégories de risque Annexe III du prototype original
  const riskCategories = [
    'Systèmes d\'IA dans les produits relevant de la législation d\'harmonisation de l\'Union (Annexe III, point 1)',
    'Systèmes d\'identification biométrique à distance (Annexe III, point 2)',
    'Systèmes d\'IA utilisés dans la gestion et l\'exploitation d\'infrastructures critiques (Annexe III, point 3)',
    'Systèmes d\'IA utilisés dans l\'éducation et la formation professionnelle (Annexe III, point 4)',
    'Systèmes d\'IA utilisés dans l\'emploi, la gestion des travailleurs et l\'accès au travail indépendant (Annexe III, point 5)',
    'Systèmes d\'IA utilisés dans l\'accès et la jouissance de services privés essentiels et de services publics (Annexe III, point 6)',
    'Systèmes d\'IA utilisés dans l\'application de la loi (Annexe III, point 7)',
    'Systèmes d\'IA utilisés dans la gestion de la migration, de l\'asile et du contrôle des frontières (Annexe III, point 8)',
    'Systèmes d\'IA utilisés dans l\'administration de la justice et les processus démocratiques (Annexe III, point 9)'
  ]

  const handleInputChange = (field, value) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }))

    setCompletionStatus(prev => ({
      ...prev,
      [field]: value.trim() !== ''
    }))
  }

  const handleNewProjectChange = (field, value) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getStepCompletion = (step) => {
    return step.fields.every(field => completionStatus[field])
  }

  const getOverallCompletion = () => {
    const totalFields = Object.keys(assessmentData).length
    const completedFields = Object.values(completionStatus).filter(Boolean).length
    return Math.round((completedFields / totalFields) * 100)
  }

  const createProject = () => {
    if (!newProject.name || !newProject.description) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      riskLevel: newProject.riskLevel,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      assessmentData: {
        systemName: newProject.name,
        version: 'v1.0',
        purpose: newProject.description,
        users: '',
        riskCategory: '',
        justification: '',
        dataGovernance: '',
        trainingDataSources: '',
        testingProcedures: '',
        performanceMetrics: '',
        humanInterventionMethod: '',
        auditTrailFunctionality: '',
        signedBy: '',
        date: new Date().toISOString().split('T')[0]
      }
    }

    setProjects([...projects, project])
    setNewProject({ name: '', description: '', riskLevel: 'minimal' })
    setCurrentView('projects')
    alert('Projet créé avec succès !')
  }

  const startAssessment = (project) => {
    setSelectedProject(project)
    setAssessmentData(project.assessmentData)
    
    // Initialize completion status
    const initialCompletion = {}
    Object.keys(project.assessmentData).forEach(key => {
      if (project.assessmentData[key] && project.assessmentData[key].trim() !== '') {
        initialCompletion[key] = true
      }
    })
    setCompletionStatus(initialCompletion)
    setCurrentStep(0)
    setCurrentView('assessment')
  }

  // Génération de rapport basée sur le prototype original
  const generateReport = () => {
    const currentDate = new Date().toLocaleDateString('fr-FR')
    const systemType = assessmentData.riskCategory ? 'Système IA à Haut Risque' : 'Système IA'
    
    // Calcul du statut de conformité pour chaque DE (comme dans le prototype)
    const complianceStatus = {
      'DE-004': assessmentData.systemName && assessmentData.purpose ? 'CONFORME' : 'NON CONFORME',
      'DE-005': assessmentData.justification ? 'CONFORME' : 'NON CONFORME',
      'DE-006': assessmentData.humanInterventionMethod && assessmentData.auditTrailFunctionality ? 'CONFORME' : 'NON CONFORME',
      'DE-001': assessmentData.dataGovernance && assessmentData.trainingDataSources ? 'CONFORME' : 'NON CONFORME',
      'DE-002': assessmentData.humanInterventionMethod ? 'CONFORME' : 'NON CONFORME',
      'DE-003': assessmentData.testingProcedures && assessmentData.performanceMetrics ? 'CONFORME' : 'NON CONFORME'
    }

    const conformeCount = Object.values(complianceStatus).filter(status => status === 'CONFORME').length
    const totalElements = Object.keys(complianceStatus).length
    const conformityRate = Math.round((conformeCount / totalElements) * 100)

    const report = `# RAPPORT DE CONFORMITÉ EU AI ACT
**Système :** ${assessmentData.systemName || '[Non spécifié]'}  
**Version :** ${assessmentData.version || '[Non spécifié]'}  
**Date d'évaluation :** ${currentDate}  
**Évaluateur :** ${assessmentData.signedBy || '[Non spécifié]'}

---

## RÉSUMÉ EXÉCUTIF

### Statut Global de Conformité
**Taux de conformité :** ${conformityRate}% (${conformeCount}/${totalElements} éléments conformes)

**Classification :** ${systemType}
**Catégorie de risque :** ${assessmentData.riskCategory || 'Non déterminée'}

### Recommandations prioritaires
${conformityRate < 100 ? '⚠️ **Actions correctives requises** - Certains éléments de divulgation obligatoires ne sont pas conformes.' : '✅ **Système conforme** - Tous les éléments de divulgation obligatoires sont satisfaits.'}

---

## MATRICE DE CONFORMITÉ

| Élément DE | Exigence Légale | Statut | Article Source | Standard |
|------------|-----------------|--------|----------------|----------|
| **DE-004** | Déclaration d'objectif du système | **${complianceStatus['DE-004']}** | Annexe IV, Section 1 | ISO 42001.4.1 |
| **DE-005** | Processus de contrôle des risques | **${complianceStatus['DE-005']}** | Article 9 | ISO 31000 |
| **DE-006** | Journal d'intervention humaine | **${complianceStatus['DE-006']}** | Article 14 | ISO 42001.7.4.2 |
| **DE-001** | Documentation de provenance des données | **${complianceStatus['DE-001']}** | Art. 10, Annexe IV | OECD.AI.1.1 |
| **DE-002** | Capacité humain-dans-la-boucle | **${complianceStatus['DE-002']}** | Article 14 | NIST RMF |
| **DE-003** | Tests de biais dans les datasets | **${complianceStatus['DE-003']}** | Art. 10(2), Annexe IV | OECD.AI.2.2 |

---

## ÉLÉMENTS DE DIVULGATION DÉTAILLÉS

### DE-004 - Déclaration d'Objectif du Système
**Statut :** ${complianceStatus['DE-004']}  
**Exigence légale :** "Une description générale du système d'IA, y compris son usage prévu et les personnes qui développent, déploient ou utilisent le système doit être fournie."

**Evidence fournie :**
- Objectif du système : ${assessmentData.purpose ? '✅ Documenté' : '❌ Manquant'}
- Utilisateurs identifiés : ${assessmentData.users ? '✅ Documenté' : '❌ Manquant'}

### DE-005 - Processus de Contrôle des Risques
**Statut :** ${complianceStatus['DE-005']}  
**Exigence légale :** "Les systèmes d'IA à haut risque doivent être développés et mis en œuvre sur la base d'un système de gestion des risques."

**Evidence fournie :**
- Classification des risques : ${assessmentData.riskCategory ? '✅ Documentée' : '❌ Manquante'}
- Justification : ${assessmentData.justification ? '✅ Fournie' : '❌ Manquante'}

### DE-006 - Journal d'Intervention Humaine
**Statut :** ${complianceStatus['DE-006']}  
**Exigence légale :** "Les systèmes d'IA à haut risque doivent être conçus de manière à permettre une supervision humaine efficace."

**Evidence fournie :**
- Méthodes d'intervention : ${assessmentData.humanInterventionMethod ? '✅ Documentées' : '❌ Manquantes'}
- Piste d'audit : ${assessmentData.auditTrailFunctionality ? '✅ Implementée' : '❌ Manquante'}

### DE-001 - Documentation de Provenance des Données
**Statut :** ${complianceStatus['DE-001']}  
**Exigence légale :** "Documentation complète des jeux de données d'entraînement, de validation et de test."

**Evidence fournie :**
- Gouvernance des données : ${assessmentData.dataGovernance ? '✅ Documentée' : '❌ Manquante'}
- Sources des données : ${assessmentData.trainingDataSources ? '✅ Identifiées' : '❌ Non spécifiées'}

### DE-002 - Capacité Humain-dans-la-Boucle
**Statut :** ${complianceStatus['DE-002']}  
**Exigence légale :** "Interface utilisateur supportant l'override en temps réel."

**Evidence fournie :**
- Mécanismes d'intervention : ${assessmentData.humanInterventionMethod ? '✅ Décrits' : '❌ Non décrits'}

### DE-003 - Tests de Biais dans les Datasets
**Statut :** ${complianceStatus['DE-003']}  
**Exigence légale :** "Validation de la représentativité des jeux de données."

**Evidence fournie :**
- Procédures de test : ${assessmentData.testingProcedures ? '✅ Documentées' : '❌ Manquantes'}
- Métriques de performance : ${assessmentData.performanceMetrics ? '✅ Définies' : '❌ Non définies'}

---

## DÉCLARATION DE CONFORMITÉ

${conformityRate === 100 ? 
`✅ **CONFORMITÉ ATTESTÉE**

Je soussigné(e) ${assessmentData.signedBy || '[Nom du responsable]'}, atteste que le système "${assessmentData.systemName || '[Nom du système]'}" version ${assessmentData.version || '[Version]'} respecte les exigences applicables du Règlement EU AI Act pour les systèmes d'IA à haut risque.

Tous les éléments de divulgation obligatoires ont été vérifiés et sont conformes aux exigences légales.` :

`⚠️ **CONFORMITÉ PARTIELLE**

Je soussigné(e) ${assessmentData.signedBy || '[Nom du responsable]'}, atteste que le système "${assessmentData.systemName || '[Nom du système]'}" version ${assessmentData.version || '[Version]'} présente un taux de conformité de ${conformityRate}% aux exigences du Règlement EU AI Act.

**Actions correctives requises :** Les éléments marqués "NON CONFORME" doivent être traités avant la mise en production.`}

**Date :** ${assessmentData.date || currentDate}  
**Signature :** ${assessmentData.signedBy || '[À compléter]'}  
**Fonction :** Responsable conformité IA

---

## ANNEXES

### Standards de Référence Applicables
- **ISO 42001:2023** - Systèmes de management de l'IA
- **ISO 31000:2018** - Management du risque  
- **NIST AI RMF 1.0** - Framework de gestion des risques IA
- **OECD AI Principles** - Principes éthiques pour l'IA

### Fichiers de Preuve Recommandés
- \`system_overview.md\` (DE-004)
- \`risk_control_flowchart.svg\` (DE-005)  
- \`intervention_log.csv\` (DE-006)
- \`data_provenance.json\` (DE-001)
- \`bias_testing_report.pdf\` (DE-003)

---
*Rapport généré par VOCIA - EU AI Act Compliance Platform*  
*Document de travail - Version ${currentDate}*`

    setGeneratedReport(report)
    setShowReport(true)
  }

  const downloadReport = () => {
    try {
      const element = document.createElement('a')
      const file = new Blob([generatedReport], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `rapport-conformite-${(assessmentData.systemName || 'système').replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.md`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error('Erreur téléchargement:', error)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReport).then(() => {
      alert('Rapport copié dans le presse-papiers !')
    }).catch(() => {
      alert('Erreur lors de la copie. Sélectionnez et copiez manuellement le texte.')
    })
  }

  const saveProjectAndReturn = () => {
    if (selectedProject) {
      // Mettre à jour le projet existant avec les nouvelles données d'évaluation
      const updatedProjects = projects.map(project => 
        project.id === selectedProject.id 
          ? { ...project, assessmentData: assessmentData }
          : project
      )
      setProjects(updatedProjects)
      alert('Projet sauvegardé avec succès !')
      setCurrentView('dashboard')
    }
  }

  const handleNextStep = () => {
    if (currentStep === steps.length - 1) {
      // Si on est dans la dernière étape, sauvegarder et retourner au dashboard
      saveProjectAndReturn()
    } else {
      // Sinon, passer à l'étape suivante
      setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
    }
  }

  const currentStepData = steps[currentStep]

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <Building className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Éléments DE</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Standards</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Éléments de Divulgation EU AI Act</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'DE-001', name: 'Documentation de provenance des données', article: 'Art. 10, Annexe IV', standard: 'OECD.AI.1.1' },
            { id: 'DE-002', name: 'Capacité humain-dans-la-boucle', article: 'Article 14', standard: 'NIST RMF' },
            { id: 'DE-003', name: 'Tests de biais dans les datasets', article: 'Art. 10(2), Annexe IV', standard: 'OECD.AI.2.2' },
            { id: 'DE-004', name: 'Déclaration d\'objectif du système', article: 'Annexe IV, Section 1', standard: 'ISO 42001.4.1' },
            { id: 'DE-005', name: 'Processus de contrôle des risques', article: 'Article 9', standard: 'ISO 31000' },
            { id: 'DE-006', name: 'Journal d\'intervention humaine', article: 'Article 14', standard: 'ISO 42001.7.4.2' }
          ].map((de) => (
            <div key={de.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">{de.id}</h4>
              <h5 className="font-medium text-gray-800 mb-2">{de.name}</h5>
              <div className="text-xs text-blue-600 mb-1">{de.article}</div>
              <div className="text-xs text-gray-500">{de.standard}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projets Récents</h3>
        <div className="space-y-3">
          {projects.map(project => (
            <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  project.riskLevel === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {project.riskLevel}
                </span>
                <button
                  onClick={() => startAssessment(project)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Évaluer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mes Projets</h2>
        <button
          onClick={() => setCurrentView('new-project')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                project.riskLevel === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {project.riskLevel}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Créé le {project.createdAt}</span>
              <span>6 éléments DE</span>
            </div>
            
            <button
              onClick={() => startAssessment(project)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Évaluation EU AI Act
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderNewProject = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Créer un Nouveau Projet</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Projet *</label>
          <input 
            type="text" 
            value={newProject.name} 
            onChange={(e) => handleNewProjectChange('name', e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Ex: Système de Scoring Crédit IA" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea 
            value={newProject.description} 
            onChange={(e) => handleNewProjectChange('description', e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            rows="4" 
            placeholder="Description détaillée du système d'IA et de ses objectifs..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niveau de Risque Estimé</label>
          <select 
            value={newProject.riskLevel} 
            onChange={(e) => handleNewProjectChange('riskLevel', e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="minimal">Risque Minimal</option>
            <option value="limited">Risque Limité</option>
            <option value="high">Risque Élevé</option>
          </select>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentView('projects')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={createProject}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Créer le Projet
          </button>
        </div>
      </div>
    </div>
  )

  const renderAssessment = () => (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Header basé sur le prototype */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Outil d'Évaluation de Conformité</h1>
            <p className="text-gray-600 mt-2">EU AI Act - Évaluation des systèmes IA à haut risque</p>
            <p className="text-sm text-gray-500 mt-1">Projet: {selectedProject?.name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{getOverallCompletion()}%</div>
            <div className="text-sm text-gray-500">Complété</div>
          </div>
        </div>
        
        {/* Progress Bar du prototype */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index === currentStep ? 'bg-blue-600 text-white' :
                  getStepCompletion(step) ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {getStepCompletion(step) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    getStepCompletion(step) ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            {steps.map(step => (
              <span key={step.id} className="text-center w-20">{step.title}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar du prototype */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full flex items-center p-3 text-left rounded-lg transition-colors ${
                    index === currentStep ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {step.icon}
                  <span className="ml-3 text-sm font-medium">{step.title}</span>
                  {getStepCompletion(step) && (
                    <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content du prototype */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              {currentStepData.icon}
              <h2 className="text-xl font-semibold text-gray-900 ml-3">{currentStepData.title}</h2>
            </div>

            <div className="space-y-6">
              {/* System Description */}
              {currentStep === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Système *</label>
                    <input
                      type="text"
                      value={assessmentData.systemName}
                      onChange={(e) => handleInputChange('systemName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Système de recommandation produits"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Version *</label>
                    <input
                      type="text"
                      value={assessmentData.version}
                      onChange={(e) => handleInputChange('version', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: v2.1.3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Objectif et Usage Prévu *</label>
                    <textarea
                      value={assessmentData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez l'objectif principal du système, son contexte d'utilisation et ses fonctionnalités clés..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Utilisateurs du Système *</label>
                    <textarea
                      value={assessmentData.users}
                      onChange={(e) => handleInputChange('users', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Qui utilise ce système ? (utilisateurs finaux, administrateurs, etc.)"
                    />
                  </div>
                </>
              )}

              {/* Risk Category */}
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie de Risque selon l'Annexe III *</label>
                    <select
                      value={assessmentData.riskCategory}
                      onChange={(e) => handleInputChange('riskCategory', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez une catégorie...</option>
                      {riskCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Justification de la Classification *</label>
                    <textarea
                      value={assessmentData.justification}
                      onChange={(e) => handleInputChange('justification', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Expliquez pourquoi votre système entre dans cette catégorie de risque selon l'Annexe III..."
                    />
                  </div>
                </>
              )}

              {/* Technical Documentation */}
              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gouvernance des Données *</label>
                    <textarea
                      value={assessmentData.dataGovernance}
                      onChange={(e) => handleInputChange('dataGovernance', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez votre politique de gouvernance des données, conformité RGPD, consentement..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sources des Données d'Entraînement *</label>
                    <textarea
                      value={assessmentData.trainingDataSources}
                      onChange={(e) => handleInputChange('trainingDataSources', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Listez et décrivez les sources de données utilisées pour l'entraînement..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Procédures de Test et Validation *</label>
                    <textarea
                      value={assessmentData.testingProcedures}
                      onChange={(e) => handleInputChange('testingProcedures', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez vos procédures de test, validation croisée, détection de biais..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Métriques de Performance *</label>
                    <textarea
                      value={assessmentData.performanceMetrics}
                      onChange={(e) => handleInputChange('performanceMetrics', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Précision, Rappel, F1-score, taux de conversion, etc."
                    />
                  </div>
                </>
              )}

              {/* Human Oversight */}
              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Méthodes d'Intervention Humaine *</label>
                    <textarea
                      value={assessmentData.humanInterventionMethod}
                      onChange={(e) => handleInputChange('humanInterventionMethod', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Comment les humains peuvent-ils intervenir ? Interface, API, processus manuel..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fonctionnalité de Piste d'Audit *</label>
                    <textarea
                      value={assessmentData.auditTrailFunctionality}
                      onChange={(e) => handleInputChange('auditTrailFunctionality', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Comment tracez-vous les décisions, interventions et modifications du système ?"
                    />
                  </div>
                </>
              )}

              {/* Declaration */}
              {currentStep === 4 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Signé par *</label>
                    <input
                      type="text"
                      value={assessmentData.signedBy}
                      onChange={(e) => handleInputChange('signedBy', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nom et fonction du responsable"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={assessmentData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {getOverallCompletion() === 100 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">Évaluation complète !</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Vous pouvez maintenant télécharger votre rapport de conformité.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Navigation du prototype */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentView('projects')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Retour aux projets
                </button>
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
              </div>
              
              <div className="flex space-x-3">
                {getOverallCompletion() === 100 && (
                  <button
                    onClick={generateReport}
                    className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Générer le Rapport
                  </button>
                )}
                
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {currentStep === steps.length - 1 ? 'Sauvegarder' : 'Suivant'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de rapport du prototype */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Rapport de Conformité EU AI Act</h3>
              <button
                onClick={() => setShowReport(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-lg">
                {generatedReport}
              </pre>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={copyToClipboard}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copier le texte
              </button>
              <button
                onClick={downloadReport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger .md
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img src={vociaLogo} alt="VOCIA" className="h-8 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-purple-600">VOCIA</h1>
                <p className="text-xs text-gray-500">EU AI Act Compliance Platform</p>
              </div>
            </div>
            
            <nav className="flex space-x-8">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('projects')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'projects' || currentView === 'new-project' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Projets
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Demo User</span>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'projects' && renderProjects()}
        {currentView === 'new-project' && renderNewProject()}
        {currentView === 'assessment' && renderAssessment()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            VOCIA - EU AI Act Compliance Platform (Basé sur le prototype original)
            <br />
            Outil d'évaluation de conformité pour l'Intelligence Artificielle selon l'EU AI Act
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

