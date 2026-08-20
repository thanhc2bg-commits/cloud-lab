import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = '/api/students';

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ studentId: '', name: '', email: '' });
    setEditingId(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({ studentId: student.studentId, name: student.name, email: student.email });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quan Ly Sinh Vien (MERN)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          placeholder="MSSV"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          required
        />
        <input
          placeholder="Ho Ten"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Cap Nhat' : 'Them Sinh Vien'}</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Ho Ten</th>
            <th>Email</th>
            <th>Thao Tac</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Sua</button>
                <button onClick={() => handleDelete(s._id)}>Xoa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;