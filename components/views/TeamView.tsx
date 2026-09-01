'use client';

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Route, BoardMember } from '../../lib/types';
import { BOARD_MEMBERS } from '../../lib/data';
import { Badge, BadgeTone } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';

interface TeamViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

type FilterCategory = 'All' | 'Supervisor' | 'Leadership' | 'Executive' | 'Deputy' | 'Council' | 'Honorary' | 'Advisory';

const CATEGORY_TONES: Record<string, BadgeTone> = {
  Supervisor: 'fire',
  Leadership: 'fire',
  Executive: 'warning',
  Deputy: 'info',
  Council: 'neutral',
  Honorary: 'neutral',
  Advisory: 'neutral',
};

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  All: 'All Members',
  Supervisor: 'Society Supervisor',
  Leadership: 'Leadership',
  Executive: 'Executive Office',
  Deputy: 'Deputies',
  Council: 'Council Members',
  Honorary: 'Honorary Members',
  Advisory: 'Advisory Committee',
};

const SECTION_ORDER: Exclude<FilterCategory, 'All'>[] = [
  'Supervisor',
  'Leadership',
  'Executive',
  'Deputy',
  'Council',
  'Honorary',
  'Advisory',
];

export function TeamView({ cardCovers }: TeamViewProps) {
  const showPhotos = cardCovers === 'Photo';
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      All: BOARD_MEMBERS.length,
      Supervisor: BOARD_MEMBERS.filter((m) => m.category === 'Supervisor').length,
      Leadership: BOARD_MEMBERS.filter((m) => m.category === 'Leadership').length,
      Executive: BOARD_MEMBERS.filter((m) => m.category === 'Executive').length,
      Deputy: BOARD_MEMBERS.filter((m) => m.category === 'Deputy').length,
      Council: BOARD_MEMBERS.filter((m) => m.category === 'Council' || Boolean(m.isCouncilMember || m.isConsoleMember)).length,
      Honorary: BOARD_MEMBERS.filter((m) => m.category === 'Honorary' || Boolean(m.isHonoraryMember || m.isHonorMember)).length,
      Advisory: BOARD_MEMBERS.filter((m) => m.category === 'Advisory').length,
    };
    return counts;
  }, []);

  const filteredMembers = useMemo(() => {
    return BOARD_MEMBERS.filter((member) => {
      const isHonor = Boolean(member.isHonoraryMember || member.isHonorMember);
      const isCouncil = Boolean(member.isCouncilMember || member.isConsoleMember);
      const matchesCategory =
        activeFilter === 'All' ||
        (activeFilter === 'Council'
          ? member.category === 'Council' || isCouncil
          : activeFilter === 'Honorary'
          ? member.category === 'Honorary' || isHonor
          : member.category === activeFilter);
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
          {/* Header & Integrated Search Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-10)',
            }}
          >
            <div style={{ maxWidth: '44rem' }}>
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

            {/* Clean Integrated Search Bar */}
            <div
              style={{
                position: 'relative',
                minWidth: '260px',
                maxWidth: '340px',
                width: '100%',
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="team-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member or role..."
                style={{
                  width: '100%',
                  minHeight: '42px',
                  padding: '0.5rem 2.25rem 0.5rem 2.5rem',
                  fontSize: 'var(--text-body-small)',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-small)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  outline: 'none',
                  transition: 'border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ink)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px var(--ink)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  id="team-search-clear-button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div
            id="board-metrics-bar"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
              gap: 'var(--space-4)',
              padding: 'var(--space-6) 0',
              marginBottom: 'var(--space-10)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {(['All', 'Supervisor', 'Leadership', 'Executive', 'Council', 'Advisory'] as FilterCategory[]).map((cat) => {
              const isSelected = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    background: isSelected ? 'var(--surface)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-small)',
                    padding: 'var(--space-2) var(--space-3)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--dur-fast) var(--ease)',
                    display: 'block',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'var(--surface)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 'var(--weight-display)',
                      lineHeight: 1,
                      color: isSelected ? 'var(--fire-orange)' : 'var(--foreground)',
                    }}
                  >
                    {filterCounts[cat]}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: isSelected ? 'var(--fire-orange)' : 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginTop: 'var(--space-1)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </div>
                </button>
              );
            })}
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 20rem), 1fr))',
                        gap: 'var(--gutter)',
                      }}
                    >
                      {groupMembers.map((member) => {
                        const tone = CATEGORY_TONES[member.category] || 'neutral';
                        const initials = getInitials(member.name);
                        const showCouncilTag = Boolean(member.isCouncilMember || member.isConsoleMember);
                        const showHonoraryTag = Boolean(member.isHonoraryMember || member.isHonorMember);

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
                              width: '100%',
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
                                  width: '100%',
                                  aspectRatio: '4 / 4.6',
                                  maxHeight: '22rem',
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
                                    label=""
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
                              {/* Top Meta Line: Category & Status Badges */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 'var(--space-2)',
                                  marginBottom: 'var(--space-3)',
                                  whiteSpace: 'nowrap',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <Badge tone={tone}>{CATEGORY_LABELS[member.category as FilterCategory] || member.category}</Badge>
                                {showHonoraryTag && (
                                  <Badge tone="warning">Honorary Member</Badge>
                                )}
                                {showCouncilTag && (
                                  <Badge tone="info">Council Member</Badge>
                                )}
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