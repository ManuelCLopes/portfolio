export const PERSONAS = ['recruiter', 'engineer', 'curious'];

export const persona = {
  recruiter: {
    label: 'Recruiter',
    accent: '#1f4fd1',
    pick: { title: 'The 30-second version', quote: '“I have 200 CVs and a coffee getting cold.”', detail: 1 },
    wipe: 'Compressing to 30 seconds…',
    meter: (p) => `${Math.round(p * 30)} / 30 s`,
  },
  engineer: {
    label: 'Engineer',
    accent: '#0e8a62',
    pick: { title: 'Show me the stack', quote: '“Skip the adjectives, where’s the architecture?”', detail: 5 },
    wipe: '$ sudo su engineer',
    meter: (p) => `build ${Math.round(p * 100)}%`,
  },
  curious: {
    label: 'Curious',
    accent: '#c2397a',
    pick: { title: 'Explain it like a friend', quote: '“What does this guy actually do all day?”', detail: 3 },
    wipe: 'Removing the jargon…',
    meter: (p) => `chapter ${Math.min(5, 1 + Math.floor(p * 5))} of 5`,
  },
};

export const isPersona = (p) => PERSONAS.includes(p);
