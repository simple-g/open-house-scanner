import { useParams, useLocation } from 'react-router-dom'

const { eventId: paramId } = useParams()
const search = new URLSearchParams(useLocation().search)
const eventId = paramId || search.get('event_id') || ''
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import QRCode from 'qrcode'

export default function Poster() {
  const { id } = useParams()
  const [event, setEvent] = useState<any>(null)
  const [qr, setQr] = useState<string>('')

  const origin = useMemo(
    () => (typeof window !== 'undefined' ? window.location.origin : ''),
    []
  )
  // 👇 point QR to your existing route /e/:eventId
  const signInUrl = `${origin}/e/${id}`

  useEffect(() => {
    if (!id) return
    fetch(`/api/events/${id}`).then(r => r.json()).then(setEvent).catch(() => {})
    QRCode.toDataURL(signInUrl).then(setQr)
  }, [id, signInUrl])

  if (!id) return <div style={{ padding: 24 }}>Missing event id</div>

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 24 }}>
      <h1 style={{ fontSize: 40, marginBottom: 0 }}>{event?.title || 'Open House'}</h1>
      {event?.address && <p style={{ color: '#555', marginTop: 4 }}>{event.address}</p>}
      {event?.agent_name && <p style={{ marginTop: 8 }}>Agent: <b>{event.agent_name}</b></p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 24 }}>
        {qr && <img src={qr} alt="Event QR" width={260} height={260} />}
        <div>
          <h3>Scan to Sign In</h3>
          <p>Point your phone camera at the QR to open the sign-in form.</p>
          <code style={{ background: '#f5f5f5', padding: '6px 8px', display: 'inline-block' }}>
            {signInUrl}
          </code>
        </div>
      </div>

      <button onClick={() => window.print()} style={{ marginTop: 24 }}>Print Poster</button>
    </div>
  )
}
