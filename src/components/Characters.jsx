// Hand-drawn persona characters for the chooser cards. Colours come from CSS tokens and the card's --c accent;
// the animation rigs live in animations.js (characterRig), keyed on these class names.

// Code lines for the engineer's window, drawn twice so the scroll loops without a seam.
const WIDTHS = [34, 22, 44, 18, 38, 28, 46, 16, 30, 40, 24, 36, 20, 42, 26, 32];
const INDENT = [0, 6, 6, 12, 6, 0];
const CodeLines = () => [0, 1].flatMap((pass) => WIDTHS.map((w, i) => {
  const indent = INDENT[i % 6];
  return <rect key={`${pass}-${i}`} className={i % 3 === 0 ? 'codeA' : 'codeB'} x={176 + indent} y={32 + (pass * WIDTHS.length + i) * 7} width={w - indent} height="3" rx="1.5" />;
}));

// Heads are shared by the chooser scenes and the contact form's peeking character.
const RecruiterHead = () => (
        <g className="head">
        <circle className="face" cx="120" cy="68" r="26" />
        <circle className="hair" cx="120" cy="39" r="8" />
        <path className="hair" d="M94 68 C90 38 150 38 146 68 C140 52 102 52 94 68 Z" />
        <g className="brows"><path className="none" d="M105 58 L114 57" /><path className="none" d="M126 57 L135 58" /></g>
        <g className="eyes"><circle className="ink" cx="110" cy="67" r="2.8" /><circle className="ink" cx="130" cy="67" r="2.8" /></g>
        <path className="none" d="M113 80 Q120 84 127 80" />
        <path className="hs" d="M92 70 C88 30 152 30 148 70" />
        <rect className="acc" x="86" y="61" width="9" height="17" rx="3" />
        <rect className="acc" x="145" y="61" width="9" height="17" rx="3" />
        <path className="hs" d="M90 76 Q93 92 107 92" />
        <circle className="acc" cx="109" cy="92" r="3" />
        </g>
);

const EngineerHead = () => (
        <g className="head">
        <circle className="face" cx="120" cy="68" r="26" />
        <path className="hair" d="M94 66 C92 44 108 38 120 40 C134 38 150 46 146 66 L141 55 L134 61 L128 52 L120 59 L112 51 L105 60 L99 55 Z" />
        <g className="eyes"><circle className="ink" cx="110" cy="68" r="2.6" /><circle className="ink" cx="130" cy="68" r="2.6" /></g>
        <g className="glasses">
        <rect className="none" x="100" y="61" width="19" height="14" rx="5" />
        <rect className="none" x="121" y="61" width="19" height="14" rx="5" />
        </g>
        <path className="none hide-on-pick mouth" d="M115 82 L125 82" />
        <path className="none alt smile" d="M112 80 Q120 87 128 80" />
        <ellipse className="glow" cx="120" cy="76" rx="25" ry="17" />
        </g>
);

const CuriousHead = () => (
        <g className="head">
        <circle className="face" cx="120" cy="68" r="26" />
        <circle className="hair" cx="98" cy="52" r="9" /><circle className="hair" cx="108" cy="44" r="10" /><circle className="hair" cx="120" cy="41" r="10" />
        <circle className="hair" cx="132" cy="44" r="10" /><circle className="hair" cx="142" cy="52" r="9" />
        <circle className="hair" cx="95" cy="63" r="6" /><circle className="hair" cx="145" cy="63" r="6" />
        <g className="brows"><path className="none" d="M103 56 Q109 52 115 55" /><path className="none" d="M125 55 Q131 51 137 56" /></g>
        <g className="eyes">
        <circle className="white" cx="110" cy="67" r="5.5" /><circle className="ink" cx="111" cy="67" r="2.8" />
        <circle className="white" cx="130" cy="67" r="5.5" /><circle className="ink" cx="131" cy="67" r="2.8" />
        </g>
        <circle className="none hide-on-pick mouth" cx="120" cy="82" r="3" />
        <path className="none alt smile" d="M112 80 Q120 88 128 80" />
        </g>
);

function Recruiter() {
  return (
    <svg className="fig" aria-hidden="true" viewBox="0 0 240 150">
    <g className="mug">
    <path className="none steam" d="M34 96 q-4 -6 0 -12 q4 -6 0 -12" />
    <path className="none steam" d="M44 96 q-4 -6 0 -12 q4 -6 0 -12" />
    </g>
    <rect className="face" x="113" y="88" width="14" height="18" rx="4" />
    <path className="acc" d="M72 150 C72 114 94 102 120 102 C146 102 168 114 168 150 Z" />
    <path className="white" d="M109 103 L120 124 L131 103 Z" />
    <RecruiterHead />
    <rect className="desk" x="-4" y="128" width="248" height="26" />
    <rect className="surf" x="27" y="100" width="22" height="28" rx="3" />
    <path className="none" d="M49 106 q9 0 9 8 q0 8 -9 8" />
    {/* CV papers */}
    <rect className="surf" x="186" y="90" width="42" height="38" rx="2" transform="rotate(6 207 109)" />
    <g className="cv">
    <rect className="surf" x="180" y="86" width="42" height="42" rx="2" />
    <rect className="line" x="186" y="92" width="14" height="14" rx="2" />
    <rect className="line" x="203" y="93" width="14" height="3" rx="1.5" />
    <rect className="line" x="203" y="99" width="10" height="3" rx="1.5" />
    <rect className="line" x="186" y="111" width="30" height="3" rx="1.5" />
    <rect className="line" x="186" y="117" width="24" height="3" rx="1.5" />
    </g>
    <g className="mark-g reveal final">
    <rect className="mark-box" x="181" y="99" width="40" height="15" rx="3" transform="rotate(-12 201 107)" />
    <text className="mark" x="201" y="110.5" textAnchor="middle" transform="rotate(-12 201 107)">HIRED?</text>
    </g>
    <g className="rubber reveal">
    <rect className="hair" x="194" y="70" width="14" height="22" rx="4" />
    <rect className="acc" x="186" y="92" width="30" height="10" rx="2" />
    </g>
    {/* arm with watch, resting on the desk */}
    <g className="arm">
    <rect className="acc" x="146" y="117" width="34" height="12" rx="6" />
    <rect className="hair" x="166" y="115" width="7" height="16" rx="2" />
    <circle className="face" cx="184" cy="123" r="6.5" />
    </g>
    </svg>
  );
}

function Engineer() {
  return (
    <svg className="fig" aria-hidden="true" viewBox="0 0 240 150">
    <defs><clipPath id="engineer-code-clip"><rect x="173" y="29" width="56" height="60" /></clipPath></defs>
    <g className="mug">
    <path className="none steam" d="M28 96 q-4 -6 0 -12 q4 -6 0 -12" />
    <path className="none steam" d="M38 96 q-4 -6 0 -12 q4 -6 0 -12" />
    </g>
    <circle className="dark" cx="120" cy="72" r="34" />
    <rect className="face" x="113" y="88" width="14" height="18" rx="4" />
    <path className="acc" d="M72 150 C72 114 94 102 120 102 C146 102 168 114 168 150 Z" />
    <path className="none" d="M112 106 L110 124" /><path className="none" d="M128 106 L130 124" />
    <EngineerHead />
    {/* laptop, seen from behind */}
    <rect className="surf" x="84" y="94" width="72" height="34" rx="3" />
    <rect className="acc" x="112" y="104" width="16" height="12" rx="3" transform="rotate(-8 120 110)" />
    <rect className="desk" x="-4" y="128" width="248" height="26" />
    <g className="hand-l"><circle className="face" cx="82" cy="126" r="6.5" /></g>
    <g className="hand-r"><circle className="face" cx="158" cy="126" r="6.5" /></g>
    <rect className="surf" x="21" y="100" width="22" height="28" rx="3" />
    <path className="none" d="M43 106 q9 0 9 8 q0 8 -9 8" />
    {/* code window */}
    <g className="win">
    <rect className="surf" x="170" y="14" width="62" height="78" rx="6" />
    <path className="none" d="M170 25 L232 25" />
    <circle className="codeB" cx="177" cy="19.5" r="2" /><circle className="codeB" cx="184" cy="19.5" r="2" /><circle className="codeB" cx="191" cy="19.5" r="2" />
    <g clipPath="url(#engineer-code-clip)"><g className="code hide-on-pick"><CodeLines /></g></g>
    <g className="success reveal final">
    <circle className="acc" cx="201" cy="50" r="13" />
    <path className="tick" d="M195 50 L199.5 54.5 L207 46" />
    <text className="ok" x="201" y="79" textAnchor="middle">build passed</text>
    </g>
    </g>
    </svg>
  );
}

function Curious() {
  return (
    <svg className="fig" aria-hidden="true" viewBox="0 0 240 150">
    <g className="mug">
    <path className="none steam" d="M52 92 q-4 -6 0 -12 q4 -6 0 -12" />
    <path className="none steam" d="M64 92 q-4 -6 0 -12 q4 -6 0 -12" />
    </g>
    <rect className="face" x="113" y="88" width="14" height="18" rx="4" />
    <path className="acc" d="M72 150 C72 114 94 102 120 102 C146 102 168 114 168 150 Z" />
    <path className="white" d="M80 124 C100 118 140 118 160 124 L162 132 C140 126 100 126 78 132 Z" />
    <CuriousHead />
    <text className="qmark qm1 hide-on-pick" x="166" y="50">?</text>
    <text className="qmark qm2 reveal" x="190" y="30" style={{ fontSize: '20px' }}>?</text>
    <text className="qmark qm3 reveal" x="152" y="24" style={{ fontSize: '15px' }}>?</text>
    <text className="qmark qm4 reveal" x="206" y="66" style={{ fontSize: '16px' }}>?</text>
    <g className="bulb reveal final">
    <path className="ray" d="M184 12 L184 4" /><path className="ray" d="M198 18 L204 12" /><path className="ray" d="M170 18 L164 12" />
    <path className="ray" d="M202 32 L210 32" /><path className="ray" d="M166 32 L158 32" />
    <circle className="yolk" cx="184" cy="32" r="14" style={{ stroke: 'var(--ink)', strokeWidth: '2.5' }} />
    <path className="none" d="M180 36 L184 30 L188 36" />
    <rect className="surf" x="177" y="46" width="14" height="5" rx="1.5" />
    <rect className="surf" x="178" y="51" width="12" height="4" rx="1.5" />
    </g>
    {/* magnifying glass, hidden behind the table until it's needed */}
    <g className="magnifier">
    <path className="none" d="M140 158 L156 176" style={{ strokeWidth: '6' }} />
    <circle className="surf" cx="130" cy="146" r="16" style={{ strokeWidth: '4' }} />
    <circle className="white" cx="130" cy="146" r="10" />
    <circle className="ink" cx="132" cy="146" r="5.5" />
    <circle className="shine" cx="134" cy="143" r="1.8" />
    </g>
    <rect className="desk" x="-4" y="128" width="248" height="26" />
    {/* a francesinha, obviously */}
    <ellipse className="surf" cx="58" cy="127" rx="30" ry="5" />
    <path className="sauce" d="M36 124 C36 112 80 112 80 124 Z" />
    <rect className="toast" x="40" y="104" width="36" height="9" rx="3" />
    <rect className="toast" x="40" y="113" width="36" height="7" rx="3" />
    <path className="sauce" d="M38 104 C46 96 70 96 78 104 L78 108 C74 112 72 106 68 110 C64 114 60 107 56 111 C52 114 48 107 44 110 C41 112 38 108 38 108 Z" />
    <ellipse className="white" cx="58" cy="98" rx="10" ry="4" />
    <circle className="yolk" cx="58" cy="97" r="3" />
    </svg>
  );
}

const CHARACTERS = { recruiter: Recruiter, engineer: Engineer, curious: Curious };
const HEADS = { recruiter: RecruiterHead, engineer: EngineerHead, curious: CuriousHead };
const SAY = {
  recruiter: 'The form’s over here. Takes 30 seconds.',
  engineer: '// read-only. Use the form.',
  curious: 'Psst! You type over there!',
};

// Peeks out from behind the contact preview and points at the form (animated by peekAndPoint).
export function Peek({ persona, peekRef }) {
  const Head = HEADS[persona];
  return (
    <span className="peek" ref={peekRef} aria-hidden="true">
      <span className="peek-say">{SAY[persona]}</span>
      <svg className="fig" viewBox="44 20 136 110">
        {persona === 'engineer' && <circle className="dark" cx="120" cy="72" r="34" />}
        <rect className="face" x="113" y="88" width="14" height="18" rx="4" />
        <path className="acc" d="M72 150 C72 114 94 102 120 102 C146 102 168 114 168 150 Z" />
        <Head />
        <g className="point">
          <rect className="acc" x="64" y="100" width="44" height="11" rx="5.5" />
          <circle className="face" cx="64" cy="105.5" r="6.5" />
          <rect className="face" x="48" y="102.5" width="14" height="6" rx="3" />
        </g>
      </svg>
    </span>
  );
}

export default function Character({ persona }) {
  const C = CHARACTERS[persona];
  return <span className="stage"><C /></span>;
}
