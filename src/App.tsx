type CareTask = {
  label: string;
  time: string;
  done: boolean;
};

type Milestone = {
  title: string;
  note: string;
  status: 'Due soon' | 'On track' | 'Planned';
};

const careTasks: CareTask[] = [
  { label: 'Vitamin buoi sang', time: '07:30', done: true },
  { label: 'Theo doi cu dong cua be', time: '10:00', done: true },
  { label: 'Uong nuoc va an nhe', time: '14:00', done: false },
  { label: 'Nghi ngoi 20 phut', time: '20:30', done: false },
];

const milestones: Milestone[] = [
  {
    title: 'Kham thai dinh ky',
    note: 'Chuan bi cau hoi ve giac ngu va dinh duong.',
    status: 'Due soon',
  },
  {
    title: 'Tui do sinh',
    note: 'Hoan tat do dung can thiet cho me va be.',
    status: 'On track',
  },
  {
    title: 'Goc ngu cua be',
    note: 'Kiem tra anh sang, nhiet do va khong gian yen tinh.',
    status: 'Planned',
  },
];

function App() {
  const completedTasks = careTasks.filter((task) => task.done).length;
  const progress = Math.round((completedTasks / careTasks.length) * 100);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Mom & Baby</p>
          <h1>Cham soc me va be, moi ngay mot nhip nho rang.</h1>
          <p>
            Theo doi lich cham soc, cot moc quan trong va nhung ghi chu can nho
            trong mot khong gian React + TypeScript gon gang.
          </p>
        </div>

        <div className="daily-card" aria-label="Tong quan ngay hom nay">
          <span className="card-label">Hom nay</span>
          <strong>{progress}%</strong>
          <span>{completedTasks} / {careTasks.length} viec da xong</span>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <section className="dashboard-grid" aria-label="Bang dieu khien cham soc">
        <article className="panel task-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Routine</p>
              <h2>Lich cham soc</h2>
            </div>
            <button type="button">Them</button>
          </div>

          <div className="task-list">
            {careTasks.map((task) => (
              <label className="task-row" key={task.label}>
                <input type="checkbox" defaultChecked={task.done} />
                <span>
                  <strong>{task.label}</strong>
                  <small>{task.time}</small>
                </span>
              </label>
            ))}
          </div>
        </article>

        <article className="panel note-panel">
          <p className="eyebrow">Health note</p>
          <h2>Ghi chu nhanh</h2>
          <textarea
            aria-label="Ghi chu suc khoe"
            defaultValue="Hom nay me ngu tot hon. Can theo doi them muc nang luong vao buoi chieu."
          />
        </article>

        <article className="panel milestone-panel">
          <p className="eyebrow">Plan</p>
          <h2>Cot moc sap toi</h2>
          <div className="milestone-list">
            {milestones.map((milestone) => (
              <div className="milestone" key={milestone.title}>
                <span>{milestone.status}</span>
                <strong>{milestone.title}</strong>
                <p>{milestone.note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
