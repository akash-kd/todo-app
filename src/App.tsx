import { useState } from 'react'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Section, Todo } from '@/types'
import './App.css'

function App() {
  const [sections, setSections] = useState<Section[]>([
    { id: '1', name: 'Personal' },
    { id: '2', name: 'Work' },
  ])
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Sample todo in Personal section', completed: false, sectionId: '1' },
    { id: '2', text: 'Sample todo in Work section', completed: false, sectionId: '2' },
  ])
  const [newSectionName, setNewSectionName] = useState('')
  const [newTodoText, setNewTodoText] = useState<Record<string, string>>({})
  const [editingTodo, setEditingTodo] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')

  // Section management
  const addSection = () => {
    if (newSectionName.trim()) {
      setSections([
        ...sections,
        { id: Date.now().toString(), name: newSectionName.trim() },
      ])
      setNewSectionName('')
    }
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId))
    setTodos(todos.filter((t) => t.sectionId !== sectionId))
  }

  // Todo management
  const addTodo = (sectionId: string) => {
    const text = newTodoText[sectionId]
    if (text?.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          sectionId,
        },
      ])
      setNewTodoText({ ...newTodoText, [sectionId]: '' })
    }
  }

  const deleteTodo = (todoId: string) => {
    setTodos(todos.filter((t) => t.id !== todoId))
  }

  const toggleTodo = (todoId: string) => {
    setTodos(
      todos.map((t) =>
        t.id === todoId ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const startEditingTodo = (todo: Todo) => {
    setEditingTodo(todo.id)
    setEditingText(todo.text)
  }

  const saveEditingTodo = () => {
    if (editingTodo && editingText.trim()) {
      setTodos(
        todos.map((t) =>
          t.id === editingTodo ? { ...t, text: editingText.trim() } : t
        )
      )
      setEditingTodo(null)
      setEditingText('')
    }
  }

  const cancelEditingTodo = () => {
    setEditingTodo(null)
    setEditingText('')
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo Application</h1>

        {/* Add Section Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter section name..."
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSection()}
              />
              <Button onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sections and Todos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card key={section.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{section.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSection(section.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                {/* Add Todo Form */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add todo..."
                    value={newTodoText[section.id] || ''}
                    onChange={(e) =>
                      setNewTodoText({
                        ...newTodoText,
                        [section.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => e.key === 'Enter' && addTodo(section.id)}
                  />
                  <Button
                    size="icon"
                    onClick={() => addTodo(section.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Todo List */}
                <div className="space-y-2">
                  {todos
                    .filter((todo) => todo.sectionId === section.id)
                    .map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center gap-2 p-2 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                      >
                        {editingTodo === todo.id ? (
                          <>
                            <Input
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEditingTodo()
                                if (e.key === 'Escape') cancelEditingTodo()
                              }}
                              className="flex-1 h-8"
                              autoFocus
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={saveEditingTodo}
                              className="h-8 w-8"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={cancelEditingTodo}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleTodo(todo.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <span
                              className={`flex-1 text-sm ${
                                todo.completed
                                  ? 'line-through text-muted-foreground'
                                  : ''
                              }`}
                            >
                              {todo.text}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => startEditingTodo(todo)}
                              className="h-8 w-8"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteTodo(todo.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  {todos.filter((todo) => todo.sectionId === section.id).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No todos yet. Add one above!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No sections yet. Create one above to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

