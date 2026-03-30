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
}

const sampleEntries: FoodEntry[] = [
  {
    id: '1',
    restaurant: 'Kopan Ramen',
    notes: 'Perfect tonkotsu broth, amazing noodle texture! Steven loved this place.',
    rating: 5,
    location: 'Reseda, CA',
    date: '2026-03-29',
    photo: '/api/placeholder/400/300'
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Steven's Food Diary</title>
        <meta name="description" content="A collection of Steven's memorable meals and restaurant experiences" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            margin: '0 0 0.5rem 0', 
            color: '#92400e',
            fontWeight: 'bold'
          }}>
            🍽️ Steven's Food Diary
          </h1>
          <p style={{ 
            color: '#78716c', 
            margin: 0,
            fontSize: '1.2rem'
          }}>
            A collection of memorable meals and restaurant experiences
          </p>
        </div>

        {/* Main Content */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem'
        }}>
          {/* Stats */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#57534e'
          }}>
            <strong>{sampleEntries.length}</strong> restaurants visited • 
            <strong> {sampleEntries.filter(e => e.rating >= 4).length}</strong> highly rated meals
          </div>

          {/* Entries Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {sampleEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }}
              >
                {/* Photo */}
                <div style={{
                  height: '250px',
                  background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '4rem'
                }}>
                  🍜
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      margin: 0,
                      color: '#1c1917',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      {entry.restaurant}
                    </h3>
                    <div style={{
                      color: '#9ca3af',
                      fontSize: '0.9rem'
                    }}>
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Rating */}
                  <div style={{
                    fontSize: '1.3rem',
                    color: '#f59e0b',
                    marginBottom: '0.5rem'
                  }}>
                    {'⭐'.repeat(entry.rating)} {entry.rating}/5
                  </div>

                  {/* Location */}
                  <div style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📍 {entry.location}
                  </div>

                  {/* Notes */}
                  <div style={{
                    color: '#374151',
                    fontStyle: 'italic',
                    lineHeight: '1.6'
                  }}>
                    📝 {entry.notes}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Entry Button */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              📱 Use CLI: food-diary add photo.jpg --restaurant "Name" --rating 5
            </div>
          </div>

          {/* Instructions */}
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#57534e'
          }}>
            <h3 style={{ marginTop: 0, color: '#92400e' }}>How to Add Entries</h3>
            <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              <li>Take a photo of your meal 📸</li>
              <li>Run: <code style={{ background: '#fef7ed', padding: '0.25rem', borderRadius: '4px' }}>
                food-diary add photo.jpg -r "Restaurant" -n "Notes" -t 5
              </code></li>
              <li>Your entry will appear here automatically!</li>
              <li>Share this URL: <strong>steven-food-diary.vercel.app</strong></li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#9ca3af',
          fontSize: '0.9rem'
        }}>
          Generated by Steven's Food Diary Tool • Built with ❤️ by StevenAI
        </div>
      </div>
    </>
  );
}