'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [agents, setAgents] = useState<any[]>([])
  const [notice, setNotice] = useState('')
  const [agentForm, setAgentForm] = useState({ name:'', email:'', phone:'', brand_color:'', calendar_link:'' })
  const [eventForm, setEventForm] = useState({ agent_id:'', title:'', address:'', start_at:'', end_at:'', is_public:true })

  useEffect(() => {
    fetch('/api/admin/list-agents').then(r=>r.json()).then(d=>setAgents(d.agents || []))
  }, [])

  const submitAgent = async (e:any) => {
    e.preventDefault()
    const res = await fetch('/api/admin/create-agent', {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(agentForm)
    })
    const d = await res.json()
    if (!res.ok) return alert(d.error||'Error')
    setAgents(a => [...a, { id:d.id, ...agentForm }])
    setAgentForm({ name:'', email:'', phone:'', brand_color:'', calendar_link:'' })
    setNotice(`Agent created. ID: ${d.id}`)
  }

  const submitEvent = async (e:any) => {
    e.preventDefault()
    const res = await fetch('/api/admin/create-event', {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(eventForm)
    })
    const d = await res.json()
    if (!res.ok) return alert(d.error||'Error')
    setNotice(`Event created. Poster: /poster/${d.id}  ·  Sign-ins: /admin/signins/${d.id}`)
    setEventForm({ agent_id:'', title:'', address:'', start_at:'', end_at:'', is_public:true })
  }

  return (
    <div style={{ maxWidth:780, margin:'32px auto', padding:16 }}>
      <h1>Admin</h1>
      {notice && <p style={{background:'#eef',padding:8,borderRadius:8}}>{notice}</p>}

      <h2>Create Agent</h2>
      <form onSubmit={submitAgent} style={{ display:'grid', gap:8 }}>
        <input placeholder="Name" value={agentForm.name} onChange={e=>setAgentForm({...agentForm,name:e.target.value})}/>
        <input placeholder="Email" value={agentForm.email} onChange={e=>setAgentForm({...agentForm,email:e.target.value})}/>
        <input placeholder="Phone" value={agentForm.phone} onChange={e=>setAgentForm({...agentForm,phone:e.target.value})}/>
        <input placeholder="Brand color (e.g. #3b82f6)" value={agentForm.brand_color} onChange={e=>setAgentForm({...agentForm,brand_color:e.target.value})}/>
        <input placeholder="Calendar link" value={agentForm.calendar_link} onChange={e=>setAgentForm({...agentForm,calendar_link:e.target.value})}/>
        <button>Create Agent</button>
      </form>

      <hr style={{margin:'24px 0'}}/>

      <h2>Create Event</h2>
      <form onSubmit={submitEvent} style={{ display:'grid', gap:8 }}>
        <select value={eventForm.agent_id} onChange={e=>setEventForm({...eventForm,agent_id:e.target.value})}>
          <option value="">Select agent…</option>
          {agents.map(a => <option key={a.id} value={a.id}>{a.name} — {a.email}</option>)}
        </select>
        <input placeholder="Title" value={eventForm.title} onChange={e=>setEventForm({...eventForm,title:e.target.value})}/>
        <input placeholder="Address" value={eventForm.address} onChange={e=>setEventForm({...eventForm,address:e.target.value})}/>
        <input type="datetime-local" value={eventForm.start_at} onChange={e=>setEventForm({...eventForm,start_at:e.target.value})}/>
        <input type="datetime-local" value={eventForm.end_at} onChange={e=>setEventForm({...eventForm,end_at:e.target.value})}/>
        <label style={{display:'flex',gap:6}}>
          <input type="checkbox" checked={eventForm.is_public} onChange={e=>setEventForm({...eventForm,is_public:e.target.checked})}/>
          Public event page
        </label>
        <button>Create Event</button>
      </form>
      <p style={{marginTop:12}}>After creating: open the poster <code>/poster/&lt;id&gt;</code> and live sign-ins <code>/admin/signins/&lt;id&gt;</code>.</p>
    </div>
  )
}
