'use client';

import React, { useState, useMemo } from 'react';
import { Route, BoardMember } from '../../lib/types';
import { BOARD_MEMBERS } from '../../lib/data';
import { Badge, Tag, BadgeTone } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';

interface TeamViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

type FilterCategory = 'All' | 'Leadership' | 'Executive' | 'Deputy' | 'Council' | 'Honorary';

const CATEGORY_TONES: Record<string, BadgeTone> = {
  Leadership: 'fire',
  Executive: 'warning',
  Deputy: 'info',
  Council: 'neutral',
  Honorary: 'neutral',
};

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  All: 'All Members',
  Leadership: 'Leadership',
  Executive: 'Executive Office',
  Deputy: 'Deputies',
  Council: 'Council Members',
  Honorary: 'Honorary Members',
};

const SECTION_ORDER: Exclude<FilterCategory, 'All'>[] = [
  'Leadership',
  'Executive',
  'Deputy',
  'Council',
  'Honorary',
];

export function TeamView({ cardCovers }: TeamViewProps) {
  const showPhotos = cardCovers === 'Photo';
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      All: BOARD_MEMBERS.length,
      Leadership: BOARD_MEMBERS.filter((m) => m.category === 'Leadership').length,
      Executive: BOARD_MEMBERS.filter((m) => m.category === 'Executive').length,
      Deputy: BOARD_MEMBERS.filter((m) => m.category === 'Deputy').length,
      Council: BOARD_MEMBERS.filter((m) => m.category === 'Council').length,
      Honorary: BOARD_MEMBERS.filter((m) => m.category === 'Honorary').length,
    };
    return counts;
  }, []);

  const filteredMembers = useMemo(() => {
    return BOARD_MEMBERS.filter((member) => {
      const matchesCategory =
        activeFilter === 'All' || member.category === activeFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.department && member.department.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div id="team-view">
      <section
        style={{
          background: 'var(--paper)',
          padding: 'var(--sec-y) 0',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: '48rem', marginBottom: 'var(--space-10)' }}>
            <div
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--weight-label)',
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Leadership & Governance
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-display)',
                margin: '0 0 var(--space-4) 0',
                color: 'var(--foreground)',
              }}
            >
              The board
            </h1>
            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              The Civil Engineering Students Society executive leadership, secretariats, student council representatives, and honorary advisory members for the current term.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            id="board-metrics-bar"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 7.5rem), 1fr))',
              gap: 'var(--space-4)',
              padding: 'var(--space-6) 0',
              marginBottom: 'var(--space-10)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {(['All', 'Leadership', 'Executive', 'Council', 'Honorary'] as FilterCategory[]).map((cat) => (
              <div key={cat}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 'var(--weight-display)',
                    lineHeight: 1,
                    color: 'var(--foreground)',
                  }}
                >
                  {filterCounts[cat]}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar & Search */}
          <div
            id="board-filter-bar"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              {(['All', ...SECTION_ORDER] as FilterCategory[]).map(
                (category) => (
                  <Tag
                    key={category}
                    id={`team-filter-${category.toLowerCase()}`}
                    selected={activeFilter === category}
                    onClick={() => setActiveFilter(category)}
                  >
                    {CATEGORY_LABELS[category]} ({filterCounts[category]})
                  </Tag>
                )
              )}
            </div>

            {/* Quick Search */}
            <div
              style={{
                position: 'relative',
                minWidth: '240px',
              }}
            >
              <input
                id="team-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member or role..."
                style={{
                  width: '100%',
                  minHeight: '38px',
                  padding: '0.375rem 0.875rem',
                  fontSize: 'var(--text-body-small)',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-small)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ink)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  id="team-search-clear-button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    padding: '2px',
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Member Cards Grid */}
          {filteredMembers.length === 0 ? (
            <div
              id="team-empty-state"
              style={{
                padding: 'var(--space-12) var(--space-6)',
                textAlign: 'center',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-medium)',
                border: '1px dashed var(--border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--space-4) 0',
                }}
              >
                No members found matching &quot;{searchQuery}&quot;
              </p>
              <button
                type="button"
                id="reset-team-filter-btn"
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-body-small)',
                  fontWeight: 'var(--weight-label)',
                  color: 'var(--fire-orange)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div id="board-members-grid">
              {SECTION_ORDER.map((groupCategory) => {
                const groupMembers = filteredMembers.filter(m => m.category === groupCategory);
                if (groupMembers.length === 0) return null;

                return (
                  <div key={groupCategory} style={{ marginBottom: 'var(--space-12)' }}>
                    
                    {/* Visual Section Header/Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                       <h3 style={{ 
                         fontFamily: 'var(--font-mono)', 
                         fontSize: '0.85rem', 
                         color: 'var(--text-muted)', 
                         textTransform: 'uppercase', 
                         letterSpacing: '0.1em',
                         margin: '0 var(--space-4) 0 0',
                         whiteSpace: 'nowrap'
                       }}>
                         {CATEGORY_LABELS[groupCategory]}
                       </h3>
                       <div style={{ height: '1px', background: 'var(--border)', flex: 1 }}></div>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
                        gap: 'var(--gutter)',
                      }}
                    >
                      {groupMembers.map((member) => {
                        const formattedId = member.id < 10 ? `0${member.id}` : `${member.id}`;
                        const tone = CATEGORY_TONES[member.category] || 'neutral';
                        const initials = getInitials(member.name);

                        return (
                          <div
                            key={member.id}
                            id={`board-member-card-${member.id}`}
                            style={{
                              background: 'var(--background)',
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius-medium)',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              transition: 'border-color var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--fire-orange)';
                              e.currentTarget.style.boxShadow = 'var(--shadow-elevated)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            {showPhotos && (
                              <div
                                style={{
                                  height: '24rem',
                                  background: 'var(--surface)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  position: 'relative',
                                  borderBottom: '1px solid var(--border)',
                                  overflow: 'hidden',
                                }}
                              >
                                {member.image ? (
                                  <PlaceholderImage
                                    label={`MEMBER ${formattedId}`}
                                    src={member.image}
                                    alt={member.name}
                                    height="100%"
                                    showLabelBadge={false}
                                    style={{ width: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: '4rem',
                                      height: '4rem',
                                      borderRadius: 'var(--radius-small)',
                                      background: 'var(--paper)',
                                      border: '1px solid var(--border)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: 'var(--font-display)',
                                      fontWeight: 'var(--weight-display)',
                                      fontSize: '1.25rem',
                                      color: 'var(--foreground)',
                                      letterSpacing: '0.04em',
                                    }}
                                  >
                                    {initials}
                                  </div>
                                )}
                              </div>
                            )}

                            <div
                              style={{
                                padding: 'var(--space-6)',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                              }}
                            >
                              {/* Top Meta Line: ID & Category Badge */}
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  marginBottom: 'var(--space-3)',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '12px',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.06em',
                                  }}
                                >
                                  MEMBER {formattedId}
                                </span>
                                <div style={{ display: 'flex' }}>
                                  <Badge tone={tone}>{CATEGORY_LABELS[member.category as FilterCategory]}</Badge>
                                </div>
                              </div>

                              {/* Member Name */}
                              <h2
                                style={{
                                  fontFamily: 'var(--font-headline)',
                                  fontWeight: 'var(--weight-headline)',
                                  fontSize: '1.25rem',
                                  lineHeight: 'var(--leading-tight)',
                                  margin: '0 0 var(--space-1) 0',
                                  color: 'var(--foreground)',
                                }}
                              >
                                {member.name}
                              </h2>

                              {/* Member Role */}
                              <div
                                style={{
                                  fontFamily: 'var(--font-label)',
                                  fontWeight: 'var(--weight-label)',
                                  fontSize: 'var(--text-body-small)',
                                  color:
                                    member.role === 'President' ||
                                    member.role === 'Vice President' ||
                                    member.role === 'Secretary-General'
                                      ? 'var(--fire-orange)'
                                      : 'var(--foreground)',
                                  marginBottom: member.scope ? 'var(--space-3)' : 0,
                                }}
                              >
                                {member.role}
                              </div>

                              {/* Scope Description */}
                              {member.scope && (
                                <p
                                  style={{
                                    fontSize: 'var(--text-body-small)',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.5,
                                    margin: 0,
                                    flex: 1,
                                  }}
                                >
                                  {member.scope}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}