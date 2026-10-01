import React, {useState, useMemo} from "react";
import{
  Phone,
  Mail,
  User,
  Coins,
  IdCard,
  CheckCircle2,
  XCircle,
  Sparkles,
  Code2,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

const CAMPOS_CONFIG = {
  nombre : {
    id: 'nombre',
    label: 'Nombre Completo',
    inputLabel: 'Ingrese su nombre completo',
    placeholder: 'Ej. Marco Velazquez',
    type: 'text',
    icon: User,
    regex: /^[A-Z][a-z]+(\s[A-Z][a-z]+){1,3}$/,//Revisar este regex pendiente tengo suenoooo
    description: 'Debe comenzar su nombre con mayus.',
    samples:['Marco Velazquez', 'Yahir Soto Campos', 'Mario David Lopez Navares Lopez (invalido)']
  },
  edad : {
    id: 'edad',
    label: 'Edad',
    inputLabel: 'Ingrese su Edad',
    placeholder: 'Ej. 18',
    type: 'text',
    icon: User,
    regex: /^(1[8-9]|[2-9][0-9])$/,
    description: 'Debe ser mayor de edad (>=18<=100).',
    samples:['68', '18', '105 (invalido)']
  },
  cel : {
    id: 'cel',
    label: 'Celular',
    inputLabel: 'Ingrese su numero de celular',
    placeholder: 'Ej. 6681874904 | 668-1874904 | 668-187-49-04',
    type: 'tel',
    icon: Phone,
    regex: /^668\-?\d{3}\-?\d{2}-?\d{2}$/,//Revisar este regex pendiente tengo suenoooo no que onda con la lada
    description: 'Deben ser solo numeros, e ir separados como en los ejemplos.',
    samples:['6681874904', '668-770-51-41', '668-3213-2133 (invalido)']
  },
  salario : {
    id: 'salario',
    label: 'Salario',
    inputLabel: 'Ingrese su salario',
    placeholder: 'Ej. 1,000 | 54,029',
    type: 'text',
    icon: Coins,
    regex: /^[1-9]\d{0,2}(\.\d{3})*$/,//Revisar este regex pendiente tengo suenoooo
    description: 'Debe ingresar el numero con separador de miles ",".',
    samples:['978', '10,576', '549023 (invalido)']
  },
  rfc : {
    id: 'rfc',
    label: 'RFC',
    inputLabel: 'Ingrese su RFC',
    placeholder: 'Ej. VAGM-010203 | VAGM-010203321',
    type: 'text',
    icon: IdCard,
    regex: /^[A-Z]{4}\-(\d{6}|\d{9})$/,//Revisar este regex pendiente tengo suenoooo
    description: 'Debe ingresar su RFC en uno de estos formatos LLLL-NNNNNN | LLLL-NNNNNNNNN.',
    samples:['VAGM-010203', 'SOCY-010203321', 'LONM-0102033221 (invalido)']
  },
  mail : {
    id: 'mail',
    label: 'Correo Electronico',
    inputLabel: 'Ingrese su correo electronico',
    placeholder: 'Ej. marcovelazquez@gmail.com | velazquez.321232@ms.uas.edu.mx',
    type: 'text',
    icon: Mail,
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,//Revisar este regex pendiente tengo suenoooo
  description: 'Debe ingresar un correo electrónico válido.',
    samples: ['marcovelazquez@gmail.com', 'velazquez@ms.uas.edu.mx', 'correo (inválido)'] }
}

export default function App(){
  const [selectedType, setSelectedType] = useState('nombre');
  const [inputValue, setInputValue] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const activeConfig = CAMPOS_CONFIG[selectedType];

  const isValid = useMemo(() => {
    if (!inputValue.trim()) return false;
    return activeConfig.regex.test(inputValue.trim());
  }, [inputValue, activeConfig]);

  const handleSelectCard = (typeId) => {
    setSelectedType(typeId);
    setInputValue('');
    setSubmittedData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setSubmittedData({
        type: activeConfig.label,
        value: inputValue
      });
    }
  };

return(
  <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans selection:bg-indigo-500 selection:text-white">
    {/*decoracion del fondo*/}

    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"/>

    <div className="relative w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
      {/*seccion de headers*/}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5"/>
          Validacion RegEx
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Formulario de Eleccion
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Seleccione una opcion para probar la expresion regular correspondiente.
        </p>
      </div>

      {/*fila de las tarjetas*/}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-8">
        {Object.values(CAMPOS_CONFIG).map((config) => {
          const isSelected = selectedType === config.id;
          const IconComponent = config.icon;

          return(
            <button
            key = {config.id}
            onClick={() => handleSelectCard(config.id)}
            type = "button"
            className=
              {`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 group
                ${isSelected ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105 border border-indigo-400/50 ring-2 ring-indigo-500/40'
                    : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 opacity-60 hover:opacity-100 scale-95'
                  }
              `}
            >
              <IconComponent className={`w-6 h-6 mb-2 transition-transform duration-300 ${isSelected ? 'scale-110 text-white' : 'group-hover:scale-105'}`} />
                <span className="font-semibold text-sm tracking-wide">{config.label}</span>
                <span className="text-[10px] mt-1 opacity-75">
                  {isSelected ? 'Clicado' : 'Seleccionar'}
                </span>
            </button>
          );
        })}
      </div>
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Code2 className="w-4 h-4" />
              <span>Patrón: {activeConfig.regex.toString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center justify-between">
                <span>{activeConfig.inputLabel}</span>
                {inputValue && (
                  <button
                    type="button"
                    onClick={() => setInputValue('')}
                    className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Limpiar
                  </button>
                )}
              </label>
              <div className="relative">
                <input
                  type={activeConfig.type}
                  value = {inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (submittedData) setSubmittedData(null);
                  }}
                  placeholder={activeConfig.placeholder}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-100 placeholder-slate-500 focus:outline-none transition-all duration-200 text-sm ${
                    inputValue.trim() === ''
                      ? 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      : isValid
                      ? 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-emerald-950/10'
                      : 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-950/10'
                  }`} 
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">{activeConfig.description}</p>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Aviso de validación:</span>
              
              {inputValue.trim() === '' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse"></span>
                  Esperando texto...
                </div>
              ) : isValid ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Aviso: Válido
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold shadow-sm animate-fade-in">
                  <XCircle className="w-3.5 h-3.5" />
                  Aviso: No válido
                </div>
              )}
            </div>

            <div className="pt-1">
              <span className="text-[11px] text-slate-500 block mb-1.5">Probar ejemplos rápidos:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeConfig.samples.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputValue(sample.replace(/\s*\(.*?\)/, ''));
                      setSubmittedData(null);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50 transition-colors"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                isValid
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-950/50 hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
              }`}
            >
              <span>Ingresar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {submittedData && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-slide-up">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">¡Ingreso exitoso!</p>
                <p className="text-xs text-emerald-400/80 mt-0.5">
                  El campo <strong className="text-emerald-200">{submittedData.type}</strong> con valor{' '}
                  <span className="font-mono bg-emerald-900/50 px-1.5 py-0.5 rounded border border-emerald-700/50">
                    "{submittedData.value}"
                  </span>{' '}
                  cumple correctamente con la regla RegEx.
                </p>
              </div>
            </div>
          )}
        </div>   
        
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Haz clic en otra tarjeta superior para cambiar el tipo de validación.</span>
        </div>
      </div>
    </div>
)
}
