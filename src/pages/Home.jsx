import React from 'react';

function Home() {
  return (
    <>
      <div className="video-con">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          ref={(el) => { if (el) el.muted = true; }}
        >
          <source src="sports_video.mp4" type="video/mp4" />
        </video>
      </div>

      <div>
        <div className="section-container">
          <div className="section-image">
            <img src="/Ground1.jpg" alt="Outdoor Practice Area" />
          </div>
          <div className="text-section">
            <h2>Outdoor Practice Facilities</h2>
            <p>This platform showcases spacious and secure outdoor netted practice zones.</p>
            <p>These areas are ideal for various sports training sessions and drills.</p>
            <p>The netting setup ensures safety and helps minimize disruptions during practice.</p>
            <p>Participants can use these spaces for warm-ups, skill-building, and coaching sessions.</p>
            <p>The layout promotes teamwork, consistency, and athletic growth.</p>
            <p>Facilities are maintained regularly to support top-notch playing conditions.</p>
          </div>
        </div>

        <div className="section-container reverse">
          <div className="section-image">
            <img src="/Ground2.jpg" alt="Indoor Training Zone" />
          </div>
          <div className="text-section">
            <h2>Outdoor Athletic Arena</h2>
            <p>This well-laid-out arena provides a spacious environment for track and field activities.</p>
            <p>The multi-lane track is ideal for sprints, long-distance runs, and relay practices.</p>
            <p>It serves as a central space for warm-ups, athletic drills, and group training sessions.</p>
            <p>The clearly marked lanes promote discipline, timing, and sportsmanship.</p>
            <p>Whether it's routine practice or sports meet preparation, this ground supports it all.</p>
            <p>Maintained with care, the facility ensures a safe and performance-driven experience for athletes.</p>
          </div>
        </div>

        <hr className="section-divider" />

        <div className="section-container">
          <div className="section-image">
            <img src="/Ground3.jpg" alt="Multi-Sports Arena" />
          </div>
          <div className="text-section">
            <h2>Multi-Sports Arena</h2>
            <p>Explore our conceptual multi-sports arena designed to host a wide range of games and events.</p>
            <p>From basketball and volleyball to futsal and skating — this mockup gives a versatile look at possibilities.</p>
            <p>Flexible arrangements enable quick setup changes depending on event or sport requirements.</p>
            <p>This demo illustrates how front-end design can visualize large sports facilities effectively.</p>
            <p>Interactive layouts and media galleries can be integrated for a richer digital experience.</p>
            <p>Built for performance, community, and scalable infrastructure planning.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
