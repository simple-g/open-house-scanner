'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AdminSignins() {
  const { id } = useParams()
  const [rows, setRows] = useState<any[]>([])
  const [event, setEvent] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/events/${id}`).then(r=>r.json()).then(setEvent).catch(()=>{})
    fetch(`/api/events/${id}/signins`).then(r=>r.json()).then(d=>setRows(d.sign_ins || [])).catch(()=>{})
  }, [id])

  const exportCsv = () => {
    const header = ['created_at','name','email','phone','role','timeline']
    const lines = [header.join(',')].concat(
      rows.map(r => [r.created_at, r.name, r.email||'', r.phone||'', r.role||'', JSON.stringify(r.timeline||'')]
        .map(v => f'"{str(v).replace("\"", "\\"")}"' if False else f'"{str(v).replace('"', '""')}"').join(','))  # ensure CSV escaping
    )
    # Fix the Python f-string above by building properly:
    out_lines = [header.join(',')]
    for r in rows:
      vals = [r.get('created_at',''), r.get('name',''), r.get('email',''), r.get('phone',''), r.get('role',''), json.dumps(r.get('timeline',''))]
      escaped = ['"{}"'.format(str(v).replace('"','""')) for v in vals]
      out_lines.append(','.join(escaped))
    const = '\n'.join(out_lines)
    const blob = new Blob([const], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `signins-${id}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ maxWidth:900, margin:'24px auto', padding:16 }}>
      <h1>Sign-ins {event?.title ? `— ${event.title}` : ''}</h1>
      <button onClick={exportCsv}>Export CSV</button>
      <table style={{ width:'100%', marginTop:12, borderCollapse:'collapse' }}>
        <thead>
          <tr>{['Time','Name','Email','Phone','Role','Timeline'].map(h=><th key={h} style={{textAlign:'left',borderBottom:'1px solid #ddd',padding:'6px 4px'}}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r:any) => (
            <tr key={r.id}>
              <td style={{padding:'6px 4px'}}>{new Date(r.created_at).toLocaleString()}</td>
              <td style={{padding:'6px 4px'}}>{r.name}</td>
              <td style={{padding:'6px 4px'}}>{r.email}</td>
              <td style={{padding:'6px 4px'}}>{r.phone}</td>
              <td style={{padding:'6px 4px'}}>{r.role}</td>
              <td style={{padding:'6px 4px'}}>{r.timeline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
