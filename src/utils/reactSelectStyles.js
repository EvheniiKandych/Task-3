export function prefixFilterOption(option, rawInput) {
  const query = rawInput.trim().toLowerCase();
  if (!query) return true;
  return option.label.toLowerCase().startsWith(query);
}

export function getReactSelectStyles(hasError = false) {
  return {
    control: (base, state) => ({
      ...base,
      minHeight: '42px',
      backgroundColor: 'var(--bg-input)',
      borderColor: hasError
        ? 'var(--danger)'
        : state.isFocused
        ? 'var(--accent-primary)'
        : 'var(--border-subtle)',
      boxShadow: state.isFocused
        ? hasError
          ? '0 0 0 3px var(--danger-bg)'
          : '0 0 0 3px var(--accent-glow)'
        : 'none',
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-primary)',
      '&:hover': {
        borderColor: hasError ? 'var(--danger)' : 'var(--border-strong)',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--bg-elevated)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      zIndex: 40,
      boxShadow: 'var(--shadow-modal)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'rgba(56, 189, 248, 0.25)'
        : state.isFocused
        ? 'var(--bg-hover)'
        : 'transparent',
      color: 'var(--text-primary)',
      cursor: 'pointer',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'rgba(56, 189, 248, 0.16)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      borderRadius: '6px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#e0f2fe',
      fontSize: '0.85rem',
      fontWeight: 500,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#7dd3fc',
      '&:hover': {
        backgroundColor: 'rgba(248, 113, 113, 0.25)',
        color: '#fecaca',
      },
    }),
    input: (base) => ({
      ...base,
      color: 'var(--text-primary)',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--text-muted)',
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: 'var(--text-secondary)',
    }),
  };
}
