/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useRef } from "react";

const T = {
  bg:"#07090C",surface:"#0C1018",card:"#111620",cardHov:"#151C28",
  border:"#182030",borderLt:"#223040",
  accent:"#E8873A",accentS:"rgba(232,135,58,0.09)",
  teal:"#2DD4BF",tealS:"rgba(45,212,191,0.08)",
  green:"#4ADE80",greenS:"rgba(74,222,128,0.08)",
  amber:"#FBBF24",amberS:"rgba(251,191,36,0.08)",
  red:"#F87171",redS:"rgba(248,113,113,0.08)",
  blue:"#60A5FA",blueS:"rgba(96,165,250,0.08)",
  purple:"#A78BFA",purpleS:"rgba(167,139,250,0.08)",
  coral:"#FB923C",
  text:"#D8E4F0",textMid:"#7A90A8",textDim:"#364860",
  mono:"'JetBrains Mono',monospace",sans:"'Outfit',sans-serif",
};

const INBOUND_STAGES = [
  { id:"nuevo_contacto",   label:"Nuevo contacto",   color:"#2DD4BF" },
  { id:"calificado",       label:"Calificado",        color:"#60A5FA" },
  { id:"cita_agendada",    label:"Cita agendada",     color:"#A78BFA" },
  { id:"visita_realizada", label:"Visita realizada",  color:"#FBBF24" },
  { id:"propuesta_enviada",label:"Propuesta enviada", color:"#FB923C" },
  { id:"negociacion",      label:"Negociación",       color:"#E8873A" },
  { id:"ganado",           label:"Cerrado ganado",    color:"#4ADE80" },
  { id:"perdido",          label:"Cerrado perdido",   color:"#F87171" },
];

const OUTBOUND_STAGES = [
  { id:"identificado",     label:"Identificado",      color:"#2DD4BF" },
  { id:"investigado",      label:"Investigado",        color:"#60A5FA" },
  { id:"mensaje_enviado",  label:"Mensaje enviado",    color:"#A78BFA" },
  { id:"respondio",        label:"Respondió",          color:"#FBBF24" },
  { id:"reunion_agendada", label:"Reunión agendada",   color:"#FB923C" },
  { id:"propuesta_enviada",label:"Propuesta enviada",  color:"#E8873A" },
  { id:"ganado",           label:"Cerrado ganado",     color:"#4ADE80" },
  { id:"perdido",          label:"Cerrado perdido",    color:"#F87171" },
];

const mkDate = (d) => { const dt=new Date(); dt.setDate(dt.getDate()-d); return dt.toISOString().split("T")[0]; };

const INBOUND_LEADS_INIT = [
  {id:1,empresa:"Transportes Garza SA de CV",contacto:"Ing. Roberto Garza",telefono:"+52 81 1234 5678",email:"rgarza@tgarza.mx",ciudad:"Monterrey, NL",flota:"28 unidades",tipo_carga:"Refrigerados / cadena de frío",urgencia:"Alta",servicio:"Arrendamiento",stage:"cita_agendada",fecha_entrada:mkDate(18),fecha_stage:mkDate(5),notas:"Flota con 3 años antigüedad, busca renovar 8 unidades este Q1.",score:92,historial:[{stage:"nuevo_contacto",fecha:mkDate(18)},{stage:"calificado",fecha:mkDate(14)},{stage:"cita_agendada",fecha:mkDate(5)}]},
  {id:2,empresa:"Logística del Norte SRL",contacto:"Lic. Carmen Vega",telefono:"+52 81 9876 5432",email:"cvega@lognorte.com",ciudad:"Monterrey, NL",flota:"45 unidades",tipo_carga:"Carga general seca",urgencia:"Media",servicio:"Compra directa",stage:"propuesta_enviada",fecha_entrada:mkDate(32),fecha_stage:mkDate(8),notas:"Interesados en 5 tractocamiones. Proceso formal.",score:78,historial:[{stage:"nuevo_contacto",fecha:mkDate(32)},{stage:"calificado",fecha:mkDate(28)},{stage:"cita_agendada",fecha:mkDate(20)},{stage:"visita_realizada",fecha:mkDate(15)},{stage:"propuesta_enviada",fecha:mkDate(8)}]},
  {id:3,empresa:"Distribuidora Apex CDMX",contacto:"Sr. Miguel Olvera",telefono:"+52 55 4567 8901",email:"molvera@apex.mx",ciudad:"CDMX",flota:"12 unidades",tipo_carga:"Electrodomésticos / retail",urgencia:"Baja",servicio:"Arrendamiento",stage:"calificado",fecha_entrada:mkDate(7),fecha_stage:mkDate(3),notas:"Inicio de operaciones en marzo.",score:61,historial:[{stage:"nuevo_contacto",fecha:mkDate(7)},{stage:"calificado",fecha:mkDate(3)}]},
  {id:4,empresa:"Grupo Industrial Reyes",contacto:"Ing. Patricia Reyes",telefono:"+52 33 3214 5678",email:"preyes@gireyesmx.com",ciudad:"Guadalajara, JAL",flota:"67 unidades",tipo_carga:"Materiales construcción",urgencia:"Alta",servicio:"Compra directa",stage:"negociacion",fecha_entrada:mkDate(45),fecha_stage:mkDate(16),notas:"Licitación formal. Oportunidad ancla.",score:95,historial:[{stage:"nuevo_contacto",fecha:mkDate(45)},{stage:"calificado",fecha:mkDate(40)},{stage:"cita_agendada",fecha:mkDate(32)},{stage:"visita_realizada",fecha:mkDate(25)},{stage:"propuesta_enviada",fecha:mkDate(15)},{stage:"negociacion",fecha:mkDate(16)}]},
  {id:5,empresa:"Retail Express MX SA",contacto:"Mtro. Juan Salinas",telefono:"+52 55 7890 1234",email:"jsalinas@retailex.mx",ciudad:"CDMX",flota:"19 unidades",tipo_carga:"Paquetería / e-commerce",urgencia:"Media",servicio:"Arrendamiento",stage:"perdido",fecha_entrada:mkDate(60),fecha_stage:mkDate(20),notas:"Presupuesto no alineado. Recontactar en Q2.",score:34,historial:[{stage:"nuevo_contacto",fecha:mkDate(60)},{stage:"calificado",fecha:mkDate(55)},{stage:"perdido",fecha:mkDate(20)}]},
  {id:6,empresa:"Alimentos del Golfo SA",contacto:"Ing. Sandra Torres",telefono:"+52 22 6543 2109",email:"storres@alimgolfo.mx",ciudad:"Veracruz, VER",flota:"33 unidades",tipo_carga:"Alimentos perecederos",urgencia:"Alta",servicio:"Compra directa",stage:"visita_realizada",fecha_entrada:mkDate(22),fecha_stage:mkDate(3),notas:"Alta intención de compra. Esperan propuesta.",score:87,historial:[{stage:"nuevo_contacto",fecha:mkDate(22)},{stage:"calificado",fecha:mkDate(18)},{stage:"cita_agendada",fecha:mkDate(10)},{stage:"visita_realizada",fecha:mkDate(3)}]},
];

const OUTBOUND_PROSPECTS_INIT = [
  {id:1,empresa:"FEMSA Logística",industria:"Retail / Distribución",ciudad:"Monterrey, NL",flota_est:"500+",web:"femsa.com",stage:"investigado",prioridad:"Alta",contacto_clave:"Dir. de Operaciones",señales:"Expansión Q1 2025, nueva planta Apodaca",fecha_entrada:mkDate(12),fecha_stage:mkDate(3),notas:"Análisis completo generado.",historial:[{stage:"identificado",fecha:mkDate(12)},{stage:"investigado",fecha:mkDate(3)}]},
  {id:2,empresa:"Grupo Bimbo Transport",industria:"Alimentos / FMCG",ciudad:"CDMX",flota_est:"300+",web:"grupobimbo.com",stage:"mensaje_enviado",prioridad:"Alta",contacto_clave:"VP Supply Chain",señales:"Renovación de flota en reporte anual",fecha_entrada:mkDate(25),fecha_stage:mkDate(6),notas:"Email enviado. Sin respuesta aún.",historial:[{stage:"identificado",fecha:mkDate(25)},{stage:"investigado",fecha:mkDate(20)},{stage:"mensaje_enviado",fecha:mkDate(6)}]},
  {id:3,empresa:"Liverpool Distribución",industria:"Retail / Moda",ciudad:"CDMX",flota_est:"80-120",web:"liverpool.com.mx",stage:"respondio",prioridad:"Media",contacto_clave:"Gerente de Flota",señales:"Nueva tienda en Guadalajara",fecha_entrada:mkDate(35),fecha_stage:mkDate(4),notas:"Respondió positivo.",historial:[{stage:"identificado",fecha:mkDate(35)},{stage:"investigado",fecha:mkDate(30)},{stage:"mensaje_enviado",fecha:mkDate(18)},{stage:"respondio",fecha:mkDate(4)}]},
  {id:4,empresa:"Grupo Lala Norte",industria:"Lácteos / Cadena frío",ciudad:"Torreón, COA",flota_est:"200+",web:"lala.com.mx",stage:"identificado",prioridad:"Alta",contacto_clave:"Dir. de Flota",señales:"Contrato nuevo con Walmart",fecha_entrada:mkDate(2),fecha_stage:mkDate(2),notas:"Recién identificado.",historial:[{stage:"identificado",fecha:mkDate(2)}]},
];

// ── UTILS ─────────────────────────────────────────────────────────────
const diasEnStage = (f) => Math.floor((new Date()-new Date(f))/(1000*60*60*24));
const getStage = (stages,id) => stages.find(s=>s.id===id);
const stageIndex = (stages,id) => stages.findIndex(s=>s.id===id);

// Parsear CSV/Excel pegado como texto
const parseCSVText = (text, type) => {
  const lines = text.trim().split("\n").filter(l=>l.trim());
  if (lines.length < 2) return [];
  const today = new Date().toISOString().split("T")[0];
  const results = [];
  for (let i=1; i<lines.length; i++) {
    const cols = lines[i].split(/[,\t;]/).map(c=>c.trim().replace(/^"|"$/g,""));
    if (!cols[0]) continue;
    const id = Date.now() + i;
    if (type === "inbound") {
      results.push({
        id, empresa:cols[0]||"Sin nombre", contacto:cols[1]||"", telefono:cols[2]||"",
        email:cols[3]||"", ciudad:cols[4]||"", flota:cols[5]||"",
        tipo_carga:cols[6]||"", urgencia:cols[7]||"Media", servicio:cols[8]||"",
        stage:"nuevo_contacto", fecha_entrada:today, fecha_stage:today,
        notas:cols[9]||"", score:parseInt(cols[10])||50,
        historial:[{stage:"nuevo_contacto",fecha:today}]
      });
    } else {
      results.push({
        id, empresa:cols[0]||"Sin nombre", industria:cols[1]||"", ciudad:cols[2]||"",
        flota_est:cols[3]||"", web:cols[4]||"", prioridad:cols[5]||"Media",
        contacto_clave:cols[6]||"", señales:cols[7]||"", notas:cols[8]||"",
        stage:"identificado", fecha_entrada:today, fecha_stage:today,
        historial:[{stage:"identificado",fecha:today}]
      });
    }
  }
  return results;
};

// ── ATOMS ─────────────────────────────────────────────────────────────
function Pill({label,color,soft}){
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:20,background:soft||`${color}12`,color,fontSize:11,fontWeight:600,border:`1px solid ${color}25`,letterSpacing:"0.04em"}}><span style={{width:5,height:5,borderRadius:"50%",background:color,flexShrink:0}}/>{label}</span>;
}
function StageBadge({stages,stageId}){const s=getStage(stages,stageId);if(!s)return null;return <Pill label={s.label} color={s.color}/>;}
function DaysChip({days,warn=7,danger=14}){const color=days>=danger?"#F87171":days>=warn?"#FBBF24":"#7A90A8";return <span style={{fontSize:10,fontWeight:700,color,fontFamily:T.mono,background:`${color}14`,padding:"2px 7px",borderRadius:4}}>{days}d</span>;}
function ScoreRing({score}){const color=score>=80?"#4ADE80":score>=60?"#FBBF24":"#F87171";const r=15,circ=2*Math.PI*r,dash=(score/100)*circ;return <div style={{position:"relative",width:40,height:40,flexShrink:0}}><svg width="40" height="40" style={{transform:"rotate(-90deg)"}}><circle cx="20" cy="20" r={r} fill="none" stroke="#182030" strokeWidth="2.5"/><circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"/></svg><span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color,fontFamily:T.mono}}>{score}</span></div>;}
function StatCard({label,value,sub,accent}){return <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 18px 12px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:2,background:accent,borderRadius:"12px 12px 0 0"}}/><div style={{fontSize:9,color:T.textMid,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:7}}>{label}</div><div style={{fontSize:26,fontWeight:700,color:T.text,lineHeight:1,fontFamily:T.mono}}>{value}</div>{sub&&<div style={{fontSize:10,color:T.textMid,marginTop:4}}>{sub}</div>}</div>;}
function Spinner({color}){return <><style>{`@keyframes sp{to{transform:rotate(360deg)}}`}</style><div style={{width:26,height:26,borderRadius:"50%",border:`2px solid ${T.border}`,borderTopColor:color||T.accent,animation:"sp 0.7s linear infinite",margin:"0 auto"}}/></>;}

function Funnel({stages,items,onFilter,activeFilter}){
  const counts=stages.map(s=>({...s,count:items.filter(i=>i.stage===s.id).length}));
  const max=Math.max(...counts.map(c=>c.count),1);
  return(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",marginBottom:18}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:6,height:72}}>
        {counts.map(s=>{
          const h=Math.max((s.count/max)*56,s.count>0?8:3);
          const active=activeFilter===s.id;
          return(
            <div key={s.id} onClick={()=>onFilter(active?null:s.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",opacity:activeFilter&&!active?0.3:1,transition:"opacity 0.15s"}}>
              <span style={{fontSize:10,fontWeight:700,color:s.count>0?s.color:T.textDim,fontFamily:T.mono}}>{s.count||""}</span>
              <div style={{width:"100%",height:h,background:active?s.color:`${s.color}40`,borderRadius:3,transition:"all 0.2s",border:active?`1px solid ${s.color}`:"none"}}/>
              <span style={{fontSize:8,color:active?s.color:T.textDim,textAlign:"center",lineHeight:1.2,maxWidth:52}}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StageMover({stages,current,onMove}){
  const idx=stageIndex(stages,current);
  if(current==="ganado"||current==="perdido")return <div style={{fontSize:11,color:T.textMid,fontStyle:"italic"}}>Deal cerrado</div>;
  const prev=idx>0?stages[idx-1]:null;
  const next=idx<stages.length-1?stages[idx+1]:null;
  return(
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {prev&&<button onClick={()=>onMove(prev.id)} style={{padding:"6px 12px",borderRadius:6,background:"transparent",border:`1px solid ${T.border}`,color:T.textMid,fontSize:11,cursor:"pointer",fontFamily:T.sans}}>← {prev.label}</button>}
      {next&&next.id!=="perdido"&&<button onClick={()=>onMove(next.id)} style={{padding:"6px 14px",borderRadius:6,background:`${next.color}18`,border:`1px solid ${next.color}40`,color:next.color,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:T.sans}}>{next.label} →</button>}
      {current!=="perdido"&&<button onClick={()=>onMove("perdido")} style={{padding:"6px 10px",borderRadius:6,background:T.redS,border:`1px solid #F8717130`,color:"#F87171",fontSize:10,cursor:"pointer",fontFamily:T.sans}}>Cerrar perdido</button>}
    </div>
  );
}

function Historial({historial,stages}){
  return(
    <div>
      <div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Historial</div>
      {historial.map((h,i)=>{
        const s=getStage(stages,h.stage);
        return(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:s?.color||T.textDim,marginTop:3}}/>
              {i<historial.length-1&&<div style={{width:1,height:16,background:T.border}}/>}
            </div>
            <div style={{paddingBottom:i<historial.length-1?4:0}}>
              <span style={{fontSize:11,color:s?.color||T.textMid,fontWeight:600}}>{s?.label||h.stage}</span>
              <span style={{fontSize:10,color:T.textDim,marginLeft:8}}>{h.fecha}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── IMPORT MODAL ──────────────────────────────────────────────────────
function ImportModal({type, onImport, onClose}){
  const [text, setText] = useState("");
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState(null);

  const INBOUND_HEADERS = "Empresa, Contacto, Teléfono, Email, Ciudad, Flota, Tipo de carga, Urgencia, Servicio, Notas, Score";
  const OUTBOUND_HEADERS = "Empresa, Industria, Ciudad, Flota estimada, Web, Prioridad, Contacto clave, Señales de compra, Notas";
  const headers = type === "inbound" ? INBOUND_HEADERS : OUTBOUND_HEADERS;
  const exampleRow = type === "inbound"
    ? "Transportes ABC, Ing. García, +52 81 0000 0000, garcia@abc.mx, Monterrey NL, 15 unidades, Carga seca, Alta, Arrendamiento, Interesado en renovar flota, 70"
    : "Empresa XYZ, Logística, Monterrey NL, 50+, xyz.com, Alta, Dir. Operaciones, Expansión norte 2025, Contactado por referido";

  const handlePreview = () => {
    setError(null);
    const rows = parseCSVText(`${headers}\n${text}`, type);
    if (rows.length === 0) { setError("No se detectaron filas válidas. Revisa el formato."); return; }
    setPreview(rows);
  };

  const handleImport = () => {
    if (preview.length === 0) return;
    onImport(preview);
    onClose();
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:T.surface,border:`1px solid ${T.borderLt}`,borderRadius:16,width:"100%",maxWidth:700,maxHeight:"85vh",overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"20px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:T.text}}>Importar {type==="inbound"?"leads inbound":"prospectos outbound"}</div>
            <div style={{fontSize:11,color:T.textMid,marginTop:2}}>Pega datos desde Excel o Google Sheets</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:`1px solid ${T.border}`,color:T.textMid,cursor:"pointer",fontSize:12,padding:"5px 12px",borderRadius:7,fontFamily:T.sans}}>✕ Cerrar</button>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
          {/* Instrucciones */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
            <div style={{fontSize:9,color:T.textMid,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Cómo importar desde Excel / Google Sheets</div>
            <div style={{fontSize:12,color:T.text,lineHeight:1.8}}>
              1. Abre tu Excel o Google Sheets<br/>
              2. Asegúrate que las columnas estén en este orden:<br/>
              <span style={{fontSize:11,color:T.accent,fontFamily:T.mono,display:"block",marginTop:6,marginBottom:6,lineHeight:1.6}}>{headers}</span>
              3. Selecciona todas las filas de datos (sin el encabezado)<br/>
              4. Copia con Ctrl+C y pega abajo con Ctrl+V
            </div>
          </div>

          {/* Ejemplo */}
          <div style={{background:`${T.accent}08`,border:`1px solid ${T.accent}20`,borderRadius:8,padding:"10px 14px",marginBottom:16}}>
            <div style={{fontSize:9,color:T.accent,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Ejemplo de fila</div>
            <div style={{fontSize:11,color:T.textMid,fontFamily:T.mono,lineHeight:1.6,wordBreak:"break-all"}}>{exampleRow}</div>
          </div>

          {/* Textarea */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Pega los datos aquí</div>
            <textarea
              value={text}
              onChange={e=>{setText(e.target.value);setPreview([]);setError(null);}}
              placeholder={`Pega tus filas de Excel aquí...\n\n${exampleRow}`}
              style={{width:"100%",height:140,padding:"10px 12px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontSize:12,outline:"none",fontFamily:T.mono,resize:"vertical",lineHeight:1.6}}
            />
          </div>

          {error && <div style={{padding:"10px 14px",borderRadius:8,background:T.redS,border:`1px solid #F8717130`,color:"#F87171",fontSize:12,marginBottom:14}}>{error}</div>}

          <button onClick={handlePreview} disabled={!text.trim()} style={{padding:"9px 20px",borderRadius:8,background:text.trim()?T.accent:"#182030",color:text.trim()?"#000":T.textDim,fontWeight:700,fontSize:12,border:"none",cursor:text.trim()?"pointer":"not-allowed",fontFamily:T.sans,marginBottom:16}}>
            Vista previa →
          </button>

          {/* Preview */}
          {preview.length>0&&(
            <div>
              <div style={{fontSize:9,color:T.green,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>✓ {preview.length} registro{preview.length>1?"s":""} listos para importar</div>
              <div style={{background:T.card,border:`1px solid ${T.green}30`,borderRadius:10,overflow:"hidden"}}>
                {preview.slice(0,5).map((row,i)=>(
                  <div key={i} style={{padding:"10px 14px",borderBottom:i<Math.min(preview.length,5)-1?`1px solid ${T.border}`:"none",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:"#2DD4BF",flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:T.text}}>{row.empresa}</div>
                      <div style={{fontSize:10,color:T.textMid,marginTop:1}}>
                        {type==="inbound" ? `${row.contacto} · ${row.ciudad} · ${row.flota}` : `${row.industria} · ${row.ciudad} · Prioridad: ${row.prioridad}`}
                      </div>
                    </div>
                  </div>
                ))}
                {preview.length>5&&<div style={{padding:"8px 14px",fontSize:11,color:T.textMid}}>...y {preview.length-5} más</div>}
              </div>
            </div>
          )}
        </div>

        <div style={{padding:"14px 24px",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"flex-end",gap:10}}>
          <button onClick={onClose} style={{padding:"9px 18px",borderRadius:8,background:"transparent",border:`1px solid ${T.border}`,color:T.textMid,fontSize:12,cursor:"pointer",fontFamily:T.sans}}>Cancelar</button>
          <button onClick={handleImport} disabled={preview.length===0} style={{padding:"9px 20px",borderRadius:8,background:preview.length>0?"#4ADE80":"#182030",color:preview.length>0?"#000":T.textDim,fontWeight:700,fontSize:12,border:"none",cursor:preview.length>0?"pointer":"not-allowed",fontFamily:T.sans}}>
            ✓ Importar {preview.length>0?`${preview.length} registros`:""}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  TAB UPDATE
// ══════════════════════════════════════════════════════════════════════
function TabUpdate({inLeads,outProspects}){
  const [brief,setBrief]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const ran=useRef(false);

  const inActive=inLeads.filter(l=>l.stage!=="ganado"&&l.stage!=="perdido").length;
  const inGanado=inLeads.filter(l=>l.stage==="ganado").length;
  const inNeg=inLeads.filter(l=>l.stage==="negociacion").length;
  const inScore=inLeads.length?Math.round(inLeads.reduce((a,b)=>a+b.score,0)/inLeads.length):0;
  const outActive=outProspects.filter(p=>p.stage!=="ganado"&&p.stage!=="perdido").length;
  const stalled=inLeads.filter(l=>diasEnStage(l.fecha_stage)>14&&l.stage!=="ganado"&&l.stage!=="perdido");
  const top=[...inLeads].filter(l=>l.stage!=="perdido").sort((a,b)=>b.score-a.score)[0];

  const generate=useCallback(async()=>{
    if(ran.current)return;ran.current=true;setLoading(true);setError(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Eres asesor estratégico C-Level de Road Tractovan (venta y arrendamiento de tractocamiones México).

PIPELINE HOY:
Inbound activos: ${inActive} | Ganados: ${inGanado} | Negociación: ${inNeg} | Score prom: ${inScore}/100 | Estancados +14d: ${stalled.length}
Lead top: ${top?.empresa||"N/A"} (stage: ${top?.stage||"N/A"}, score ${top?.score||0})
Etapas inbound: ${INBOUND_STAGES.map(s=>s.label+": "+inLeads.filter(l=>l.stage===s.id).length).join(" | ")}
Outbound activos: ${outActive} | Etapas: ${OUTBOUND_STAGES.map(s=>s.label+": "+outProspects.filter(p=>p.stage===s.id).length).join(" | ")}

Genera briefing ejecutivo EXACTAMENTE con esta estructura:

**SITUACIÓN GENERAL**
[2-3 líneas]

**OPORTUNIDAD CRÍTICA**
[2-3 líneas]

**3 PRIORIDADES ESTA SEMANA**
• [Prioridad 1]
• [Prioridad 2]
• [Prioridad 3]

**PROYECCIÓN**
[1-2 líneas]

Ejecutivo, directo, español, sin emojis, máximo 200 palabras.`}]})});
      const d=await res.json();setBrief(d.content?.[0]?.text||"Sin respuesta.");
    }catch(e){setError("Error conectando con Claude API.");}
    setLoading(false);
  },[inLeads,outProspects]);

  const secC=(t)=>t.includes("GENERAL")?{c:"#E8873A",s:"rgba(232,135,58,0.09)"}:t.includes("CRÍTICA")?{c:"#FBBF24",s:"rgba(251,191,36,0.08)"}:t.includes("PRIORIDADES")?{c:"#4ADE80",s:"rgba(74,222,128,0.08)"}:{c:"#60A5FA",s:"rgba(96,165,250,0.08)"};
  const sections=brief?brief.split(/\n(?=\*\*)/).filter(Boolean):[];

  return(
    <div style={{maxWidth:900,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{padding:"3px 10px",borderRadius:6,background:T.accentS,border:`1px solid ${T.accent}30`,fontSize:9,color:T.accent,fontWeight:700,letterSpacing:"0.1em"}}>BRIEFING EJECUTIVO · C-LEVEL</span>
            <span style={{fontSize:10,color:T.textDim}}>{new Date().toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</span>
          </div>
          <div style={{fontSize:20,fontWeight:700,color:T.text}}>Resumen Ejecutivo — Road Tractovan</div>
          <div style={{fontSize:12,color:T.textMid,marginTop:2}}>Pipeline inbound + outbound consolidado</div>
        </div>
        <button onClick={()=>{ran.current=false;setBrief(null);generate();}} style={{padding:"9px 18px",borderRadius:8,background:T.accentS,border:`1px solid ${T.accent}30`,color:T.accent,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:T.sans}}>{loading?"...":brief?"↻ Regenerar":"✦ Generar briefing"}</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18}}>
        <StatCard label="Leads activos" value={inActive} sub="Inbound" accent="#E8873A"/>
        <StatCard label="Ganados" value={inGanado} sub="Cerrados" accent="#4ADE80"/>
        <StatCard label="Negociación" value={inNeg} sub="Calientes" accent="#FBBF24"/>
        <StatCard label="Estancados" value={stalled.length} sub="+14 días" accent="#F87171"/>
        <StatCard label="Outbound" value={outActive} sub="Activos" accent="#A78BFA"/>
        <StatCard label="Score prom." value={inScore} sub="/ 100" accent="#60A5FA"/>
      </div>
      {stalled.length>0&&<div style={{background:T.redS,border:`1px solid #F8717125`,borderRadius:10,padding:"11px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}><div style={{width:6,height:6,borderRadius:"50%",background:"#F87171",flexShrink:0}}/><span style={{fontSize:12,color:"#F87171",fontWeight:600}}>{stalled.length} lead{stalled.length>1?"s":""} sin movimiento +14 días: </span><span style={{fontSize:12,color:T.textMid}}>{stalled.map(l=>l.empresa).join(", ")}</span></div>}
      {!brief&&!loading&&!error&&<div style={{padding:"50px 0",textAlign:"center"}}><div style={{fontSize:36,marginBottom:14}}>📊</div><div style={{fontSize:13,color:T.textMid,marginBottom:18}}>El briefing se genera con IA analizando el estado real del pipeline</div><button onClick={generate} style={{padding:"12px 28px",borderRadius:10,background:T.accent,color:"#000",fontWeight:700,fontSize:13,border:"none",cursor:"pointer",fontFamily:T.sans}}>✦ Generar Update ejecutivo</button></div>}
      {loading&&<div style={{padding:"50px 0",textAlign:"center"}}><Spinner color={T.accent}/><div style={{fontSize:12,color:T.textMid,marginTop:12}}>Analizando pipeline con Claude...</div></div>}
      {error&&<div style={{padding:14,borderRadius:10,background:T.redS,border:`1px solid #F8717130`,color:"#F87171",fontSize:13}}>{error}</div>}
      {sections.map((sec,i)=>{const m=sec.match(/\*\*([^*]+)\*\*/);const title=m?.[1]||"";const body=sec.replace(/\*\*[^*]+\*\*\n?/,"").trim();const{c,s}=secC(title);return <div key={i} style={{marginBottom:12,padding:"16px 20px",borderRadius:12,background:s,border:`1px solid ${c}20`}}><div style={{fontSize:9,color:c,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:8}}>{title}</div><div style={{fontSize:13,color:T.text,lineHeight:1.85,whiteSpace:"pre-wrap"}}>{body}</div></div>;})}
      {brief&&<div style={{marginTop:6,padding:"10px 14px",borderRadius:8,background:T.card,border:`1px solid ${T.border}`,display:"flex",gap:8,alignItems:"center"}}><div style={{width:5,height:5,borderRadius:"50%",background:T.accent,flexShrink:0}}/><span style={{fontSize:10,color:T.textDim}}>Análisis IA · Claude Sonnet · Pipeline en tiempo real</span></div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  TAB INBOUND
// ══════════════════════════════════════════════════════════════════════
function TabInbound({leads:initialLeads}){
  const [leads,setLeads]=useState(initialLeads);
  const [selected,setSelected]=useState(null);
  const [stageFilter,setStageFilter]=useState(null);
  const [search,setSearch]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiResult,setAiResult]=useState(null);
  const [showImport,setShowImport]=useState(false);
  const [importCount,setImportCount]=useState(0);

  const moveStage=(id,ns)=>{
    const today=new Date().toISOString().split("T")[0];
    setLeads(prev=>prev.map(l=>l.id!==id?l:{...l,stage:ns,fecha_stage:today,historial:[...l.historial,{stage:ns,fecha:today}]}));
    setSelected(prev=>prev?.id===id?{...prev,stage:ns,fecha_stage:today,historial:[...prev.historial,{stage:ns,fecha:today}]}:prev);
  };

  const handleImport=(rows)=>{
    setLeads(prev=>[...prev,...rows]);
    setImportCount(rows.length);
    setTimeout(()=>setImportCount(0),4000);
  };

  const total=leads.length;
  const active=leads.filter(l=>l.stage!=="ganado"&&l.stage!=="perdido").length;
  const ganado=leads.filter(l=>l.stage==="ganado").length;
  const neg=leads.filter(l=>l.stage==="negociacion").length;
  const stalled=leads.filter(l=>diasEnStage(l.fecha_stage)>14&&l.stage!=="ganado"&&l.stage!=="perdido").length;

  const filtered=leads.filter(l=>{
    if(stageFilter&&l.stage!==stageFilter)return false;
    if(search&&!`${l.empresa}${l.contacto}${l.ciudad}`.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const handleAI=useCallback(async(lead)=>{
    setAiLoading(true);setAiResult(null);
    try{
      const s=getStage(INBOUND_STAGES,lead.stage);
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:`Asesor ventas B2B transporte pesado México. Lead de Road Tractovan:
Empresa: ${lead.empresa} · ${lead.ciudad} | Contacto: ${lead.contacto}
Flota: ${lead.flota} · Urgencia: ${lead.urgencia} · Etapa: ${s?.label} · Días: ${diasEnStage(lead.fecha_stage)} · Score: ${lead.score}/100
Notas: ${lead.notas}

POTENCIAL
[2 líneas]

SIGUIENTE PASO
[1 acción concreta]

ARGUMENTO CLAVE
[1 frase personalizada]

RIESGO
[1 línea]

Español, 110 palabras máximo.`}]})});
      const d=await res.json();setAiResult(d.content?.[0]?.text||"Sin respuesta.");
    }catch(e){setAiResult("Error con Claude API.");}
    setAiLoading(false);
  },[]);

  return(
    <div>
      {showImport&&<ImportModal type="inbound" onImport={handleImport} onClose={()=>setShowImport(false)}/>}

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:16}}>
        <StatCard label="Total" value={total} sub="Desde inicio" accent={T.accent}/>
        <StatCard label="Activos" value={active} sub="En pipeline" accent="#2DD4BF"/>
        <StatCard label="Ganados" value={ganado} sub="Cerrados" accent="#4ADE80"/>
        <StatCard label="Negociación" value={neg} sub="Calientes" accent="#FBBF24"/>
        <StatCard label="Estancados" value={stalled} sub="+14 días" accent="#F87171"/>
      </div>

      <Funnel stages={INBOUND_STAGES} items={leads} onFilter={setStageFilter} activeFilter={stageFilter}/>

      {importCount>0&&<div style={{background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:8,padding:"10px 16px",marginBottom:14,fontSize:12,color:"#4ADE80",fontWeight:600}}>✓ {importCount} leads importados correctamente</div>}

      <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar empresa, ciudad..." style={{flex:1,padding:"8px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontSize:12,outline:"none",fontFamily:T.sans}}/>
        {stageFilter&&<button onClick={()=>setStageFilter(null)} style={{padding:"8px 14px",borderRadius:8,background:T.redS,border:`1px solid #F8717130`,color:"#F87171",fontSize:11,cursor:"pointer",fontFamily:T.sans}}>✕ Filtro</button>}
        <button onClick={()=>setShowImport(true)} style={{padding:"8px 16px",borderRadius:8,background:"rgba(45,212,191,0.08)",border:"1px solid rgba(45,212,191,0.3)",color:"#2DD4BF",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:T.sans,whiteSpace:"nowrap"}}>↑ Importar Excel</button>
      </div>

      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:T.surface,borderBottom:`1px solid ${T.border}`}}>{["","Empresa","Flota / Carga","Etapa","Días","Urgencia","Score",""].map((h,i)=><th key={i} style={{padding:"10px 14px",textAlign:"left",fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(lead=>{
              const dias=diasEnStage(lead.fecha_stage);
              const urgC=lead.urgencia==="Alta"?"#F87171":lead.urgencia==="Media"?"#FBBF24":T.textMid;
              return(
                <tr key={lead.id} onClick={()=>{setSelected(lead);setAiResult(null);}} style={{borderBottom:`1px solid ${T.border}`,cursor:"pointer",transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background=T.cardHov} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{padding:"11px 14px 11px 18px",width:40}}><ScoreRing score={lead.score}/></td>
                  <td style={{padding:"11px 14px"}}><div style={{fontSize:13,fontWeight:600,color:T.text}}>{lead.empresa}</div><div style={{fontSize:10,color:T.textMid,marginTop:1}}>{lead.ciudad} · {lead.contacto}</div></td>
                  <td style={{padding:"11px 14px"}}><div style={{fontSize:12,color:T.text,fontFamily:T.mono}}>{lead.flota}</div><div style={{fontSize:10,color:T.textMid,marginTop:1}}>{lead.tipo_carga}</div></td>
                  <td style={{padding:"11px 14px"}}><StageBadge stages={INBOUND_STAGES} stageId={lead.stage}/></td>
                  <td style={{padding:"11px 14px"}}><DaysChip days={dias}/></td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:11,fontWeight:700,color:urgC}}>{lead.urgencia==="Alta"?"▲":lead.urgencia==="Media"?"●":"▽"} {lead.urgencia}</span></td>
                  <td style={{padding:"11px 14px",width:80}}><div style={{height:3,background:T.border,borderRadius:2,overflow:"hidden"}}><div style={{width:`${lead.score}%`,height:"100%",background:lead.score>=80?"#4ADE80":lead.score>=60?"#FBBF24":"#F87171",borderRadius:2}}/></div></td>
                  <td style={{padding:"11px 18px 11px 8px"}}><button onClick={e=>{e.stopPropagation();setSelected(lead);setAiResult(null);}} style={{padding:"4px 10px",borderRadius:6,background:T.accentS,border:`1px solid ${T.accent}30`,color:T.accent,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:T.sans}}>Ver →</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{padding:36,textAlign:"center",color:T.textDim,fontSize:13}}>No hay leads. Importa desde Excel o espera leads de WhatsApp.</div>}
      </div>
      <div style={{marginTop:8,fontSize:10,color:T.textDim}}>{filtered.length} de {leads.length} leads · Click en el embudo para filtrar por etapa</div>

      {selected&&<>
        <div onClick={()=>setSelected(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:140}}/>
        <div style={{position:"fixed",top:0,right:0,bottom:0,width:460,background:T.surface,borderLeft:`1px solid ${T.border}`,zIndex:150,display:"flex",flexDirection:"column",animation:"pIn 0.18s ease"}}>
          <style>{`@keyframes pIn{from{transform:translateX(24px);opacity:0}to{transform:none;opacity:1}}`}</style>
          <div style={{padding:"18px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontSize:14,fontWeight:700,color:T.text}}>{selected.empresa}</div><div style={{fontSize:11,color:T.textMid,marginTop:1}}>{selected.contacto} · {selected.ciudad}</div></div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:`1px solid ${T.border}`,color:T.textMid,cursor:"pointer",fontSize:12,padding:"4px 10px",borderRadius:6}}>✕</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,padding:"12px 14px",background:T.card,borderRadius:10,border:`1px solid ${T.border}`}}>
              <div><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>Etapa actual</div><StageBadge stages={INBOUND_STAGES} stageId={selected.stage}/></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>Días en etapa</div><DaysChip days={diasEnStage(selected.fecha_stage)}/></div>
            </div>
            <div style={{marginBottom:16}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Mover a etapa</div><StageMover stages={INBOUND_STAGES} current={selected.stage} onMove={(s)=>moveStage(selected.id,s)}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px",marginBottom:14}}>
              {[["Flota",selected.flota],["Servicio",selected.servicio],["Tipo de carga",selected.tipo_carga],["Urgencia",selected.urgencia],["Teléfono",selected.telefono],["Email",selected.email],["Entrada",selected.fecha_entrada]].map(([k,v])=><div key={k} style={{marginBottom:10}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>{k}</div><div style={{fontSize:12,color:T.text,wordBreak:"break-all"}}>{v||"—"}</div></div>)}
            </div>
            <div style={{marginBottom:16}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5}}>Notas</div><div style={{fontSize:12,color:T.text,background:T.card,padding:12,borderRadius:8,lineHeight:1.7,border:`1px solid ${T.border}`}}>{selected.notas||"Sin notas"}</div></div>
            <div style={{marginBottom:16}}><Historial historial={selected.historial} stages={INBOUND_STAGES}/></div>
            <button onClick={()=>handleAI(selected)} disabled={aiLoading} style={{width:"100%",padding:"11px 0",borderRadius:8,background:aiLoading?T.border:T.accent,color:"#000",fontWeight:700,fontSize:12,border:"none",cursor:aiLoading?"not-allowed":"pointer",fontFamily:T.sans}}>{aiLoading?"Analizando...":"✦ Análisis IA del prospecto"}</button>
            {aiResult&&<div style={{marginTop:12,background:T.accentS,border:`1px solid ${T.accent}30`,borderRadius:8,padding:14}}><div style={{fontSize:9,color:T.accent,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7}}>Claude · Análisis</div><div style={{fontSize:12,color:T.text,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{aiResult}</div></div>}
          </div>
        </div>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  TAB OUTBOUND
// ══════════════════════════════════════════════════════════════════════
function TabOutbound({prospects:initialProspects}){
  const [prospects,setProspects]=useState(initialProspects);
  const [selected,setSelected]=useState(null);
  const [stageFilter,setStageFilter]=useState(null);
  const [search,setSearch]=useState("");
  const [analysis,setAnalysis]=useState({});
  const [analysisLoading,setAnalysisLoading]=useState({});
  const [showImport,setShowImport]=useState(false);
  const [importCount,setImportCount]=useState(0);

  const moveStage=(pid,ns)=>{
    const today=new Date().toISOString().split("T")[0];
    setProspects(prev=>prev.map(p=>p.id!==pid?p:{...p,stage:ns,fecha_stage:today,historial:[...p.historial,{stage:ns,fecha:today}]}));
    setSelected(prev=>prev?.id===pid?{...prev,stage:ns,fecha_stage:today,historial:[...prev.historial,{stage:ns,fecha:today}]}:prev);
  };

  const handleImport=(rows)=>{
    setProspects(prev=>[...prev,...rows]);
    setImportCount(rows.length);
    setTimeout(()=>setImportCount(0),4000);
  };

  const runAnalysis=useCallback(async(p)=>{
    const id=p.id;setAnalysisLoading(prev=>({...prev,[id]:true}));setAnalysis(prev=>({...prev,[id]:null}));
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Consultor McKinsey analizando "${p.empresa}" para Road Tractovan (tractocamiones México). Busca info real. Genera: RESUMEN EJECUTIVO, FODA, MODELO DE NEGOCIO, BENCHMARK VS COMPETENCIA, SEÑALES DE COMPRA (por qué necesitan tractocamiones AHORA), CONTACTO IDEAL (cargo + cómo llegar), MENSAJE DE OUTREACH (4-5 líneas personalizado para Road Tractovan), SIGUIENTES PASOS (3 acciones). En español, datos reales.`}]})});
      const d=await res.json();const txt=d.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n")||"";
      setAnalysis(prev=>({...prev,[id]:txt}));moveStage(id,"investigado");
    }catch(e){setAnalysis(prev=>({...prev,[id]:"Error generando análisis."}));}
    setAnalysisLoading(prev=>({...prev,[id]:false}));
  },[]);

  const filtered=prospects.filter(p=>{
    if(stageFilter&&p.stage!==stageFilter)return false;
    if(search&&!`${p.empresa}${p.industria}${p.ciudad}`.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const pActive=prospects.filter(p=>p.stage!=="ganado"&&p.stage!=="perdido").length;
  const pGanado=prospects.filter(p=>p.stage==="ganado").length;
  const pRespondio=prospects.filter(p=>p.stage==="respondio").length;
  const pAlta=prospects.filter(p=>p.prioridad==="Alta").length;

  return(
    <div>
      {showImport&&<ImportModal type="outbound" onImport={handleImport} onClose={()=>setShowImport(false)}/>}

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        <StatCard label="Prospectos activos" value={pActive} sub="En pipeline" accent="#A78BFA"/>
        <StatCard label="Respondieron" value={pRespondio} sub="Interés confirmado" accent="#FBBF24"/>
        <StatCard label="Prioridad alta" value={pAlta} sub="Top prospects" accent="#F87171"/>
        <StatCard label="Ganados" value={pGanado} sub="Convertidos" accent="#4ADE80"/>
      </div>

      <Funnel stages={OUTBOUND_STAGES} items={prospects} onFilter={setStageFilter} activeFilter={stageFilter}/>

      {importCount>0&&<div style={{background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.3)",borderRadius:8,padding:"10px 16px",marginBottom:14,fontSize:12,color:"#4ADE80",fontWeight:600}}>✓ {importCount} prospectos importados correctamente</div>}

      <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar empresa, industria, ciudad..." style={{flex:1,padding:"8px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontSize:12,outline:"none",fontFamily:T.sans}}/>
        {stageFilter&&<button onClick={()=>setStageFilter(null)} style={{padding:"8px 14px",borderRadius:8,background:T.redS,border:`1px solid #F8717130`,color:"#F87171",fontSize:11,cursor:"pointer",fontFamily:T.sans}}>✕ Filtro</button>}
        <button onClick={()=>setShowImport(true)} style={{padding:"8px 16px",borderRadius:8,background:T.purpleS,border:`1px solid #A78BFA30`,color:"#A78BFA",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:T.sans,whiteSpace:"nowrap"}}>↑ Importar Excel</button>
      </div>

      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:T.surface,borderBottom:`1px solid ${T.border}`}}>{["Empresa","Industria / Ciudad","Flota","Etapa","Días","Prioridad",""].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(p=>{
              const dias=diasEnStage(p.fecha_stage);
              const prioC=p.prioridad==="Alta"?"#F87171":p.prioridad==="Media"?"#FBBF24":T.textMid;
              return(
                <tr key={p.id} onClick={()=>setSelected(p===selected?null:p)} style={{borderBottom:`1px solid ${T.border}`,cursor:"pointer",transition:"background 0.1s",background:selected?.id===p.id?T.cardHov:"transparent"}} onMouseEnter={e=>e.currentTarget.style.background=T.cardHov} onMouseLeave={e=>e.currentTarget.style.background=selected?.id===p.id?T.cardHov:"transparent"}>
                  <td style={{padding:"11px 14px"}}><div style={{fontSize:13,fontWeight:600,color:T.text}}>{p.empresa}</div><div style={{fontSize:10,color:T.textMid,marginTop:1}}>{p.web}</div></td>
                  <td style={{padding:"11px 14px"}}><div style={{fontSize:12,color:T.text}}>{p.industria}</div><div style={{fontSize:10,color:T.textMid,marginTop:1}}>{p.ciudad}</div></td>
                  <td style={{padding:"11px 14px",fontSize:12,color:T.text,fontFamily:T.mono}}>{p.flota_est}</td>
                  <td style={{padding:"11px 14px"}}><StageBadge stages={OUTBOUND_STAGES} stageId={p.stage}/></td>
                  <td style={{padding:"11px 14px"}}><DaysChip days={dias} warn={5} danger={10}/></td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:11,fontWeight:700,color:prioC}}>{p.prioridad==="Alta"?"▲":p.prioridad==="Media"?"●":"▽"} {p.prioridad}</span></td>
                  <td style={{padding:"11px 14px",display:"flex",gap:6,alignItems:"center"}}>
                    <button onClick={e=>{e.stopPropagation();runAnalysis(p);setSelected(p);}} disabled={analysisLoading[p.id]} style={{padding:"4px 10px",borderRadius:6,background:T.purpleS,border:`1px solid #A78BFA30`,color:"#A78BFA",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:T.sans,opacity:analysisLoading[p.id]?0.5:1}}>{analysisLoading[p.id]?"...":"✦ Analizar"}</button>
                    <button onClick={e=>{e.stopPropagation();setSelected(p);}} style={{padding:"4px 10px",borderRadius:6,background:T.accentS,border:`1px solid ${T.accent}30`,color:T.accent,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:T.sans}}>Ver →</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{padding:36,textAlign:"center",color:T.textDim,fontSize:13}}>No hay prospectos. Importa desde Excel o desde la herramienta de prospección.</div>}
      </div>
      <div style={{marginTop:8,fontSize:10,color:T.textDim}}>{filtered.length} de {prospects.length} prospectos · Click en el embudo para filtrar</div>

      {selected&&<>
        <div onClick={()=>setSelected(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:140}}/>
        <div style={{position:"fixed",top:0,right:0,bottom:0,width:500,background:T.surface,borderLeft:`1px solid ${T.border}`,zIndex:150,display:"flex",flexDirection:"column"}}>
          <div style={{padding:"18px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontSize:14,fontWeight:700,color:T.text}}>{selected.empresa}</div><div style={{fontSize:11,color:T.textMid,marginTop:1}}>{selected.industria} · {selected.ciudad}</div></div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:`1px solid ${T.border}`,color:T.textMid,cursor:"pointer",fontSize:12,padding:"4px 10px",borderRadius:6}}>✕</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,padding:"12px 14px",background:T.card,borderRadius:10,border:`1px solid ${T.border}`}}>
              <div><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>Etapa actual</div><StageBadge stages={OUTBOUND_STAGES} stageId={selected.stage}/></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>Días en etapa</div><DaysChip days={diasEnStage(selected.fecha_stage)} warn={5} danger={10}/></div>
            </div>
            <div style={{marginBottom:16}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Mover a etapa</div><StageMover stages={OUTBOUND_STAGES} current={selected.stage} onMove={(s)=>moveStage(selected.id,s)}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px",marginBottom:14}}>
              {[["Flota est.",selected.flota_est],["Prioridad",selected.prioridad],["Contacto clave",selected.contacto_clave],["Web",selected.web],["Entrada",selected.fecha_entrada]].map(([k,v])=><div key={k} style={{marginBottom:10}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>{k}</div><div style={{fontSize:12,color:T.text}}>{v||"—"}</div></div>)}
            </div>
            <div style={{marginBottom:14}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5}}>Señales de compra</div><div style={{fontSize:12,color:T.text,background:T.card,padding:10,borderRadius:8,border:`1px solid ${T.border}`,lineHeight:1.6}}>{selected.señales||"—"}</div></div>
            <div style={{marginBottom:14}}><div style={{fontSize:9,color:T.textDim,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5}}>Notas</div><div style={{fontSize:12,color:T.text,background:T.card,padding:10,borderRadius:8,border:`1px solid ${T.border}`,lineHeight:1.6}}>{selected.notas||"—"}</div></div>
            <div style={{marginBottom:16}}><Historial historial={selected.historial} stages={OUTBOUND_STAGES}/></div>
            <button onClick={()=>runAnalysis(selected)} disabled={analysisLoading[selected.id]} style={{width:"100%",padding:"11px 0",borderRadius:8,background:analysisLoading[selected.id]?T.border:"#A78BFA",color:"#000",fontWeight:700,fontSize:12,border:"none",cursor:analysisLoading[selected.id]?"not-allowed":"pointer",fontFamily:T.sans,marginBottom:10}}>{analysisLoading[selected.id]?"Generando análisis...":"✦ Análisis consultoría completo"}</button>
            {analysis[selected.id]&&<div style={{background:T.purpleS,border:`1px solid #A78BFA30`,borderRadius:10,padding:16}}><div style={{fontSize:9,color:"#A78BFA",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>Claude · Análisis consultoría · Web Search</div><div style={{fontSize:12,color:T.text,lineHeight:1.85,whiteSpace:"pre-wrap"}}>{analysis[selected.id]}</div></div>}
            {analysisLoading[selected.id]&&<div style={{padding:"20px 0",textAlign:"center"}}><Spinner color="#A78BFA"/><div style={{fontSize:11,color:T.textMid,marginTop:10}}>Analizando con web search...</div></div>}
          </div>
        </div>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  ROOT
// ══════════════════════════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]=useState("update");
  const TABS=[{id:"update",label:"Update",dot:"#E8873A"},{id:"inbound",label:"Inbound",dot:"#2DD4BF"},{id:"outbound",label:"Outbound",dot:"#A78BFA"}];
  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:T.sans}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}input::placeholder{color:${T.textDim}}textarea::placeholder{color:${T.textDim}}select option{background:${T.card}}`}</style>
      <div style={{position:"sticky",top:0,zIndex:50,borderBottom:`1px solid ${T.border}`,background:`${T.surface}F2`,backdropFilter:"blur(14px)",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:28,height:28,borderRadius:7,background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🚛</div>
          <span style={{fontWeight:700,fontSize:14}}>Road Tractovan</span>
          <span style={{color:T.textDim,fontSize:13,margin:"0 4px"}}>/</span>
          <div style={{display:"flex",gap:2}}>
            {TABS.map(t=>{const active=tab===t.id;return <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:7,background:active?T.card:"none",border:`1px solid ${active?T.borderLt:"transparent"}`,color:active?T.text:T.textMid,fontSize:12,fontWeight:active?600:400,cursor:"pointer",fontFamily:T.sans,transition:"all 0.15s"}}><span style={{width:5,height:5,borderRadius:"50%",background:active?t.dot:T.textDim,flexShrink:0}}/>{t.label}</button>;})}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:T.textMid}}><div style={{width:5,height:5,borderRadius:"50%",background:"#4ADE80",boxShadow:"0 0 5px #4ADE80"}}/>WhatsApp activo · Demo</div>
          <span style={{fontSize:10,color:T.textDim}}>{new Date().toLocaleDateString("es-MX",{day:"2-digit",month:"short",year:"numeric"})}</span>
        </div>
      </div>
      <div style={{padding:"28px 32px",maxWidth:1500,margin:"0 auto"}}>
        {tab==="update"&&<TabUpdate inLeads={INBOUND_LEADS_INIT} outProspects={OUTBOUND_PROSPECTS_INIT}/>}
        {tab==="inbound"&&<TabInbound leads={INBOUND_LEADS_INIT}/>}
        {tab==="outbound"&&<TabOutbound prospects={OUTBOUND_PROSPECTS_INIT}/>}
      </div>
    </div>
  );
}