import React from 'react';
import Head from 'next/head';

interface FoodEntry {
  id: string;
  restaurant: string;
  notes: string;
  rating: number;
  location: string;
  date: string;
  photo: string;
  dishes?: string[];
}

const entries: FoodEntry[] = [
  {
    id: '2',
    restaurant: 'Black Angus Steakhouse',
    notes: 'Steak and lobster night! Classic surf and turf - perfectly cooked. Living large! 🥩🦞',
    rating: 5,
    location: 'Reseda, CA',
    date: '2026-04-09',
    photo: '',
    dishes: ['Steak', 'Lobster', 'Surf & Turf']
  },
  {
    id: '1',
    restaurant: 'Korean BBQ Restaurant',
    notes: 'Miso, salad, golden crunch roll and bulgogi - everything was delicious!',
    rating: 5,
    location: 'Reseda, CA',
    date: '2026-03-29',
    photo: '/photos/korean-bbq-2026-03-29.jpg',
    dishes: ['Bulgogi', 'Miso Soup', 'Golden Crunch Roll', 'Tempura Shrimp', 'Salad']
  }
];

const version = '1.3.0';

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= rating ? '#F59E0B' : '#E5E7EB'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '10px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '3px' }}>{label}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const totalMeals = entries.length;
  const avgRating = entries.length > 0 ? entries.reduce((sum, e) => sum + e.rating, 0) / totalMeals : 0;
  const locations = [...new Set(entries.map(e => e.location))].length;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <>
      <Head>
        <title>Steven&apos;s Food Diary</title>
        <meta name="description" content="A visual journal of memorable meals" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F9FAFB; }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .entry-content { padding: 16px !important; }
          .entry-photo { height: 280px !important; }
          .hero-title { font-size: 28px !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#111827'
      }}>
        {/* Top bar */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #E5E7EB',
          padding: '0 24px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px'
            }}>🍽</div>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Food Diary</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: '#9CA3AF',
              background: '#F3F4F6',
              padding: '3px 8px',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>v{version}</span>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            }}>S</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '32px 24px 80px'
        }}>
          {/* Greeting */}
          <div style={{ marginBottom: '28px' }}>
            <h1 className="hero-title" style={{
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              marginBottom: '4px'
            }}>
              {getGreeting()}, Steven
            </h1>
            <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
              {today}
            </p>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '32px'
          }}>
            <StatCard icon="📸" value={String(totalMeals)} label="Meals logged" color="#FEF3C7" />
            <StatCard icon="⭐" value={avgRating.toFixed(1)} label="Avg rating" color="#FEF9C3" />
            <StatCard icon="📍" value={String(locations)} label={locations === 1 ? 'City' : 'Cities'} color="#ECFDF5" />
          </div>

          {/* Section header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>Recent Meals</h2>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{totalMeals} {totalMeals === 1 ? 'entry' : 'entries'}</span>
          </div>

          {/* Entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {entries.map((entry) => (
              <article
                key={entry.id}
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Photo */}
                {entry.photo && (
                  <div className="entry-photo" style={{
                    height: '400px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#F3F4F6'
                  }}>
                    <img
                      src={entry.photo}
                      alt={entry.restaurant}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="entry-content" style={{ padding: '20px 24px 24px' }}>
                  {/* Top row: name + rating */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        marginBottom: '4px'
                      }}>
                        {entry.restaurant}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '13px',
                        color: '#6B7280'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {entry.location}
                        </span>
                        <span>{formatDate(entry.date)}</span>
                      </div>
                    </div>
                    <StarRating rating={entry.rating} />
                  </div>

                  {/* Dishes */}
                  {entry.dishes && entry.dishes.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      margin: '14px 0'
                    }}>
                      {entry.dishes.map((dish, i) => (
                        <span key={i} style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: '#F9FAFB',
                          border: '1px solid #F3F4F6',
                          color: '#4B5563'
                        }}>
                          {dish}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: '#6B7280',
                    marginTop: '12px'
                  }}>
                    {entry.notes}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {entries.length === 0 && (
            <div style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              textAlign: 'center',
              padding: '60px 20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                margin: '0 auto 16px'
              }}>📸</div>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>No meals logged yet</p>
              <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Send a food photo to StevenAI on WhatsApp to get started</p>
            </div>
          )}

          {/* How it works */}
          <div style={{
            marginTop: '32px',
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '20px 24px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>How it works</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {[
                { icon: '📱', title: 'Snap a photo', desc: 'Take a pic of your meal' },
                { icon: '💬', title: 'Send to StevenAI', desc: 'Share via WhatsApp with details' },
                { icon: '✨', title: 'Auto-published', desc: 'Appears here automatically' }
              ].map((step, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: i === 0 ? '#FEF3C7' : i === 1 ? '#DBEAFE' : '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    margin: '0 auto 8px'
                  }}>{step.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{step.title}</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #E5E7EB',
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#D1D5DB',
          background: '#fff'
        }}>
          Powered by StevenAI
        </div>
      </div>
    </>
  );
}
