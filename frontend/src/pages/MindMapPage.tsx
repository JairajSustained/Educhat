import { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { 
  Network, 
  Plus, 
  Download, 
  Sparkles,
  Trash2,
  Save,
  Layout
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useChatStore } from '@/stores'
import { generateId } from '@/utils/helpers'

interface MindMapData {
  id: string
  title: string
  nodes: Node[]
  edges: Edge[]
  createdAt: Date
}

const MOCK_MINDMAPS: MindMapData[] = [
  {
    id: '1',
    title: 'Photosynthesis Process',
    nodes: [
      { id: '1', type: 'default', position: { x: 250, y: 0 }, data: { label: 'Photosynthesis' } },
      { id: '2', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Light Reaction' } },
      { id: '3', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Dark Reaction' } },
      { id: '4', type: 'default', position: { x: 50, y: 200 }, data: { label: 'Chlorophyll' } },
      { id: '5', type: 'default', position: { x: 150, y: 200 }, data: { label: 'Sunlight' } },
      { id: '6', type: 'default', position: { x: 350, y: 200 }, data: { label: 'Calvin Cycle' } },
      { id: '7', type: 'default', position: { x: 450, y: 200 }, data: { label: 'CO2 Fixation' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
    ],
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Algebraic Equations',
    nodes: [
      { id: '1', type: 'default', position: { x: 250, y: 0 }, data: { label: 'Algebra' } },
      { id: '2', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Linear Equations' } },
      { id: '3', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Quadratic Equations' } },
      { id: '4', type: 'default', position: { x: 50, y: 200 }, data: { label: 'ax + b = c' } },
      { id: '5', type: 'default', position: { x: 150, y: 200 }, data: { label: 'One Variable' } },
      { id: '6', type: 'default', position: { x: 350, y: 200 }, data: { label: 'ax² + bx + c = 0' } },
      { id: '7', type: 'default', position: { x: 450, y: 200 }, data: { label: 'Discriminant' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
    ],
    createdAt: new Date(),
  },
]

export function MindMapPage() {
  const { selectedSubject } = useChatStore()
  const [mindMaps, setMindMaps] = useState<MindMapData[]>(MOCK_MINDMAPS)
  const [activeMindMap, setActiveMindMap] = useState<MindMapData | null>(null)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [generateTopic, setGenerateTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )
  
  const handleCreateMindMap = () => {
    const newMindMap: MindMapData = {
      id: generateId(),
      title: 'Untitled Mind Map',
      nodes: [
        { 
          id: '1', 
          type: 'default', 
          position: { x: 250, y: 250 }, 
          data: { label: 'Central Topic' } 
        },
      ],
      edges: [],
      createdAt: new Date(),
    }
    setActiveMindMap(newMindMap)
    setNodes(newMindMap.nodes)
    setEdges(newMindMap.edges)
  }
  
  const handleOpenMindMap = (mindMap: MindMapData) => {
    setActiveMindMap(mindMap)
    setNodes(mindMap.nodes)
    setEdges(mindMap.edges)
  }
  
  const handleCloseMindMap = () => {
    setActiveMindMap(null)
    setNodes([])
    setEdges([])
  }
  
  const handleSaveMindMap = () => {
    if (!activeMindMap) return
    
    const updatedMindMap = {
      ...activeMindMap,
      nodes,
      edges,
    }
    
    setMindMaps((prev) => {
      const index = prev.findIndex((m) => m.id === updatedMindMap.id)
      if (index >= 0) {
        const newMindMaps = [...prev]
        newMindMaps[index] = updatedMindMap
        return newMindMaps
      }
      return [updatedMindMap, ...prev]
    })
    
    setActiveMindMap(updatedMindMap)
  }
  
  const handleGenerateMindMap = () => {
    if (!generateTopic.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const newMindMap: MindMapData = {
        id: generateId(),
        title: generateTopic,
        nodes: [
          { id: '1', type: 'default', position: { x: 400, y: 50 }, data: { label: generateTopic } },
          { id: '2', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Concept 1' } },
          { id: '3', type: 'default', position: { x: 400, y: 150 }, data: { label: 'Concept 2' } },
          { id: '4', type: 'default', position: { x: 600, y: 150 }, data: { label: 'Concept 3' } },
          { id: '5', type: 'default', position: { x: 150, y: 250 }, data: { label: 'Detail 1' } },
          { id: '6', type: 'default', position: { x: 250, y: 250 }, data: { label: 'Detail 2' } },
          { id: '7', type: 'default', position: { x: 350, y: 250 }, data: { label: 'Detail 3' } },
          { id: '8', type: 'default', position: { x: 450, y: 250 }, data: { label: 'Detail 4' } },
          { id: '9', type: 'default', position: { x: 550, y: 250 }, data: { label: 'Detail 5' } },
          { id: '10', type: 'default', position: { x: 650, y: 250 }, data: { label: 'Detail 6' } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e1-3', source: '1', target: '3' },
          { id: 'e1-4', source: '1', target: '4' },
          { id: 'e2-5', source: '2', target: '5' },
          { id: 'e2-6', source: '2', target: '6' },
          { id: 'e3-7', source: '3', target: '7' },
          { id: 'e3-8', source: '3', target: '8' },
          { id: 'e4-9', source: '4', target: '9' },
          { id: 'e4-10', source: '4', target: '10' },
        ],
        createdAt: new Date(),
      }
      
      setMindMaps((prev) => [newMindMap, ...prev])
      setIsGenerating(false)
      setShowGenerateModal(false)
      setGenerateTopic('')
      
      // Open the new mind map
      handleOpenMindMap(newMindMap)
    }, 2000)
  }
  
  const handleAddNode = () => {
    const newNode: Node = {
      id: generateId(),
      type: 'default',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { label: 'New Node' },
    }
    setNodes((nds) => [...nds, newNode])
  }
  
  // Mind Map Editor View
  if (activeMindMap) {
    return (
      <div className="h-[calc(100vh-8rem)] -m-6 flex flex-col">
        {/* Editor Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" onClick={handleCloseMindMap}>
              Back
            </Button>
            <h2 className="text-lg font-semibold text-gray-900">{activeMindMap.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleAddNode}>
              <Plus className="w-4 h-4 mr-2" />
              Add Node
            </Button>
            <Button variant="secondary" size="sm">
              <Layout className="w-4 h-4 mr-2" />
              Auto Layout
            </Button>
            <Button size="sm" onClick={handleSaveMindMap}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        {/* React Flow Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
            <Panel position="top-right" className="bg-white p-2 rounded-lg shadow-md">
              <p className="text-xs text-gray-500">Drag to move • Click to edit</p>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    )
  }
  
  // Mind Map List View
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mind Maps</h1>
          <p className="text-gray-600 mt-1">
            Visualize and organize concepts with AI-generated mind maps
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCreateMindMap}>
            <Plus className="w-4 h-4 mr-2" />
            Create Blank
          </Button>
          <Button onClick={() => setShowGenerateModal(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
        </div>
      </div>
      
      {/* Subject Info */}
      {selectedSubject && (
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
          <p className="text-sm text-primary-800">
            Generating mind maps for: <strong>{selectedSubject.name}</strong>
          </p>
        </div>
      )}
      
      {/* Mind Map Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mindMaps.map((mindMap) => (
          <Card
            key={mindMap.id}
            hover
            className="cursor-pointer"
            onClick={() => handleOpenMindMap(mindMap)}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Network className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{mindMap.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {mindMap.nodes.length} nodes • {mindMap.edges.length} connections
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {mindMap.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {mindMaps.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Network className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No mind maps yet</h3>
          <p className="text-gray-500 mt-2">
            Create your first mind map or generate one with AI
          </p>
        </div>
      )}
      
      {/* Generate Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate Mind Map"
        description="Enter a topic and AI will create a mind map for you"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <Input
              value={generateTopic}
              onChange={(e) => setGenerateTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, Indian History, Quadratic Equations"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowGenerateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleGenerateMindMap}
              disabled={!generateTopic.trim() || isGenerating}
              isLoading={isGenerating}
            >
              Generate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
