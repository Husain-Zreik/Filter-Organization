import { Tag, Mail } from 'lucide-react'

export default function TeamCard({ member }) {
  const { name, role, description, skills, image, initials, email } = member

  return (
    <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center">
      {/* Avatar — photo with initials fallback */}
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00334a]/10 mb-4 bg-[#E8EDF0] shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary font-bold text-xl">
            {initials}
          </div>
        )}
      </div>

      {/* Name & Role */}
      <h3 className="font-bold text-primary text-base mb-1">{name}</h3>
      <p className="text-xs font-semibold text-accent mb-3">{role}</p>

      {/* Description */}
      <p className="text-sm text-secondary opacity-70 leading-relaxed mb-4 line-clamp-3">{description}</p>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/8 text-primary"
            >
              <Tag size={9} />
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Email */}
      {email && (
        <a
          href={`mailto:${email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-xs text-secondary opacity-55 hover:opacity-100 hover:text-accent transition-all duration-200 mt-auto"
        >
          <Mail size={12} />
          <span>{email}</span>
        </a>
      )}
    </div>
  )
}
