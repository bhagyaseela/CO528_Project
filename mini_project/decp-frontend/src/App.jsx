import { useMemo, useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', section: 'Main' },
  { id: 'feed', label: 'Feed', icon: '📰', section: 'Main' },
  { id: 'members', label: 'Members', icon: '👥', section: 'Main' },
  { id: 'jobs', label: 'Jobs & Internships', icon: '💼', section: 'Career' },
  { id: 'events', label: 'Events', icon: '📅', section: 'Career' },
  { id: 'research', label: 'Research', icon: '🔬', section: 'Collaborate' },
  { id: 'messaging', label: 'Messaging', icon: '💬', section: 'Collaborate' },
  { id: 'analytics', label: 'Analytics', icon: '📊', section: 'Admin' },
  { id: 'profile', label: 'My Profile', icon: '👤', section: 'Admin' }
];

const seedPosts = [
  { id: 1, author: 'Kamal Perera', batch: 'E19', text: '🎉 Just accepted an offer at WSO2 as a Software Engineer!', likes: 42 },
  { id: 2, author: 'Ishara Fernando', batch: 'E18', text: 'Open-sourced our final year project. Feedback welcome!', likes: 18 }
];

const seedJobs = [
  { id: 1, company: 'WSO2', title: 'Software Engineering Intern', location: 'Colombo', tags: ['React', 'Java', 'AWS'] },
  { id: 2, company: 'Sysco Labs', title: 'Associate Software Engineer', location: 'Remote', tags: ['Node.js', 'TypeScript'] }
];

const seedEvents = [
  { id: 1, title: 'Tech Talk: AI/ML in Industry', date: '14 Apr', location: 'E-Block Main Hall' },
  { id: 2, title: 'Alumni Networking Night', date: '20 Apr', location: 'Faculty Auditorium' }
];

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(seedPosts);

  const groupedNav = useMemo(() => {
    const map = new Map();
    navItems.forEach((item) => {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section).push(item);
    });
    return [...map.entries()];
  }, []);

  const submitPost = () => {
    if (!postText.trim()) return;
    setPosts((prev) => [
      { id: Date.now(), author: 'Current User', batch: 'E20', text: postText.trim(), likes: 0 },
      ...prev
    ]);
    setPostText('');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">
          <h1>DECP</h1>
          <span>UoP · CE Dept</span>
        </div>

        <nav className="nav">
          {groupedNav.map(([section, items]) => (
            <div key={section}>
              <div className="nav-section">{section}</div>
              {items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span className="icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <h2>{navItems.find((n) => n.id === activePage)?.label}</h2>
          <input className="search" placeholder="Search members, posts, jobs..." />
        </header>

        <section className="content">
          {activePage === 'dashboard' && (
            <>
              <div className="grid-4">
                <StatCard title="Total Members" value="1,247" trend="↑ 12 this week" />
                <StatCard title="Open Jobs" value="38" trend="↑ 5 new today" />
                <StatCard title="Upcoming Events" value="7" trend="Next: Apr 14" />
                <StatCard title="Research Groups" value="24" trend="↑ 3 active" />
              </div>
              <div className="card mt16">Converted from DECP_Platform.html into reusable React components.</div>
            </>
          )}

          {activePage === 'feed' && (
            <>
              <div className="card">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Share an update with CE community..."
                />
                <button className="btn" onClick={submitPost}>Post</button>
              </div>
              {posts.map((post) => (
                <div className="card post" key={post.id}>
                  <div className="post-title">{post.author} · {post.batch}</div>
                  <p>{post.text}</p>
                  <small>{post.likes} likes</small>
                </div>
              ))}
            </>
          )}

          {activePage === 'jobs' && seedJobs.map((job) => (
            <div className="card" key={job.id}>
              <div className="post-title">{job.title}</div>
              <p>{job.company} · {job.location}</p>
              <div className="tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          ))}

          {activePage === 'events' && seedEvents.map((event) => (
            <div className="card" key={event.id}>
              <div className="post-title">{event.title}</div>
              <p>{event.date} · {event.location}</p>
            </div>
          ))}

          {!['dashboard', 'feed', 'jobs', 'events'].includes(activePage) && (
            <div className="card">{activePage} page scaffold converted and ready for API integration.</div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend }) {
  return (
    <div className="stat-card">
      <div className="value">{value}</div>
      <div className="title">{title}</div>
      <div className="trend">{trend}</div>
    </div>
  );
}
