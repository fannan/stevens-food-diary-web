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

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? '#F59E0B' : '#E5E7EB'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Home() {
  const totalMeals = entries.length;
  const avgRating = entries.reduce((sum, e) => sum + e.rating, 0) / totalMeals;
  const locations = [...new Set(entries.map(e => e.location))].length;

  return (
    <>
      <Head>
        <title>Steven's Food Diary</title>
        <meta name="description" content="A visual journal of memorable meals" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#FAFAFA',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#1D1F20'
      }}>
        {/* Nav */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #EAEBEB',
          padding: '0 2rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🍽</span>
            <span style={{ fontWeight: 600, fontSize: '15px', letterSpacing: '-0.01em' }}>Steven's Food Diary</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>{totalMeals} {totalMeals === 1 ? 'meal' : 'meals'} logged</span>
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              background: '#F3F4F6',
              padding: '4px 10px',
              borderRadius: '6px',
              color: '#6B7280'
            }}>v{require('../package.json').version}</span>
          </div>
        </nav>

        {/* Hero */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '64px 24px 48px'
        }}>
          <h1 style={{
            fontSize: '40px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: '0 0 12px'
          }}>
            Every meal tells a story.
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '560px'
          }}>
            A visual journal of Steven's food adventures across LA and beyond.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '32px',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #EAEBEB'
          }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>{totalMeals}</div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>Meals logged</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>{avgRating.toFixed(1)}</div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>Avg rating</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>{locations}</div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>Cities</div>
            </div>
          </div>
        </div>

        {/* Entries */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 24px 80px'
        }}>
          {entries.map((entry) => (
            <article
              key={entry.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #EAEBEB',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '24px',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Photo - hero style, big */}
              {entry.photo && (
                <div style={{
                  width: '100%',
                  maxHeight: '480px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#F3F4F6'
                }}>
                  <img
                    src={entry.photo}
                    alt={entry.restaurant}
                    style={{
                      width: '100%',
                      height: '480px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Gradient overlay at bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                    pointerEvents: 'none'
                  }} />
                  {/* Date badge on photo */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '6px 12px',
                    borderRadius: '8px'
                  }}>
                    {formatDate(entry.date)}
                  </div>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '24px 28px 28px' }}>
                {/* Header row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h2 style={{
                      margin: 0,
                      fontSize: '22px',
                      fontWeight: 700,
                      letterSpacing: '-0.02em'
                    }}>
                      {entry.restaurant}
                    </h2>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '6px',
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {entry.location}
                    </div>
                  </div>
                  <StarRating rating={entry.rating} />
                </div>

                {/* Dishes tags */}
                {entry.dishes && entry.dishes.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '16px'
                  }}>
                    {entry.dishes.map((dish, i) => (
                      <span key={i} style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: '#F9FAFB',
                        border: '1px solid #F3F4F6',
                        color: '#374151'
                      }}>
                        {dish}
                      </span>
                    ))}
                  </div>
                )}

                {/* Notes */}
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#4B5563'
                }}>
                  {entry.notes}
                </p>
              </div>
            </article>
          ))}

          {/* Empty state if no entries */}
          {entries.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#9CA3AF'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>🍽</div>
              <p style={{ fontSize: '16px', margin: '0 0 4px' }}>No meals logged yet</p>
              <p style={{ fontSize: '14px', margin: 0 }}>Send a food photo to StevenAI on WhatsApp to get started</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid #EAEBEB',
          padding: '24px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#9CA3AF'
        }}>
          Built by StevenAI — Send food photos via WhatsApp to add entries
        </footer>
      </div>
    </>
  );
}
