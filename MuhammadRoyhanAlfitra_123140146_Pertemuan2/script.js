class DataManager {
  constructor() {
    this.notes = safeParse("notes") || [];
    this.events = safeParse("events") || [];
  }

  saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
    };
    this.notes.push(newNote);
    this.saveData("notes", this.notes);
  };
  updateNote = (id, newText) => {
    const note = this.notes.find((n) => n.id === id);
    if (note) {
      note.text = newText;
      this.saveData("notes", this.notes);
    }
  };

  deleteNote = (id) => {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.saveData("notes", this.notes);
  };

  addEvent = (name, time, location) => {
    const newEvent = { id: Date.now(), name, time, location };
    this.events.push(newEvent);
    this.saveData("events", this.events);
  };

  updateEvent = (id, newName, newTime, newLocation) => {
    const event = this.events.find((e) => e.id === id);
    if (event) {
      event.name = newName;
      event.time = newTime;
      event.location = newLocation;
      this.saveData("events", this.events);
    }
  };

  deleteEvent = (id) => {
    this.events = this.events.filter((e) => e.id !== id);
    this.saveData("events", this.events);
  };
}

// Fungsi aman untuk parsing localStorage
const safeParse = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.warn("Failed to parse localStorage", key, err);
    localStorage.removeItem(key);
    return null;
  }
};

// Simple HTML escaper to avoid injecting raw user input into innerHTML
const escapeHtml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const dataManager = new DataManager();
const notesContainer = document.getElementById("notesContainer");
const eventsContainer = document.getElementById("eventsContainer");

// --------- Arrow Functions ---------

const renderNotes = () => {
  if (!notesContainer) return;
  notesContainer.innerHTML = "";

  if (dataManager.notes.length === 0) {
    notesContainer.innerHTML =
      '<p class="text-gray-500 text-center mt-3">Belum ada catatan.</p>';
    return;
  }

  dataManager.notes.forEach((note) => {
    const noteEl = document.createElement("div");
    noteEl.className =
      "bg-primary-50 p-3 rounded-lg flex justify-between items-start";
    noteEl.innerHTML = `
      <p class="flex-1">${escapeHtml(note.text)}</p>
      <div class="flex space-x-2 ml-3">
        <button data-id="${
          note.id
        }" class="edit-note-btn text-primary-500 hover:text-primary-700" type="button" aria-label="Edit note">
          <i data-feather="edit-2" class="w-4 h-4"></i>
        </button>
        <button data-id="${
          note.id
        }" class="delete-note-btn text-red-500 hover:text-red-700" type="button" aria-label="Delete note">
          <i data-feather="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    notesContainer.appendChild(noteEl);
  });

  if (window.feather && typeof window.feather.replace === "function") {
    window.feather.replace();
  }
};
const renderEvents = () => {
  if (!eventsContainer) return;
  eventsContainer.innerHTML = "";

  if (dataManager.events.length === 0) {
    eventsContainer.innerHTML = `<tr> <td colspan="4" class="py-3 text-center text-gray-500">Belum ada jadwal acara.</td> </tr>`;
    return;
  }

  dataManager.events.forEach((event) => {
    const row = document.createElement("tr");
    row.className = "border-b border-primary-100 hover:bg-primary-50";
    row.innerHTML = `
      <td class="py-3 px-4">${escapeHtml(event.time)}</td>
      <td class="py-3 px-4">${escapeHtml(event.name)}</td>
      <td class="py-3 px-4">${escapeHtml(event.location)}</td>
      <td class="py-3 px-4 flex space-x-2">
        <button data-id="${
          event.id
        }" class="edit-event-btn text-primary-500 hover:text-primary-700" type="button" aria-label="Edit event">
          <i data-feather="edit-2" class="w-4 h-4"></i>
        </button>
        <button data-id="${
          event.id
        }" class="delete-event-btn text-red-500 hover:text-red-700" type="button" aria-label="Delete event">
          <i data-feather="trash-2" class="w-4 h-4"></i>
        </button>
      </td>
    `;
    eventsContainer.appendChild(row);
  });

  if (window.feather && typeof window.feather.replace === "function") {
    window.feather.replace();
  }
};

// --------- Fungsi Async untuk Cuaca ---------
const fetchWeather = async (latitude = -6.2, longitude = 106.8) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!res.ok) throw new Error("Gagal mengambil data cuaca");
    const data = await res.json();

    const tempEl = document.getElementById("weatherTemp");
    if (tempEl && data.current_weather) {
      tempEl.textContent = `${Math.round(data.current_weather.temperature)}°C`;
    }
  } catch (err) {
    console.warn("Gagal memuat data cuaca:", err);
  }
};

// --------- Event Listeners ---------
const attachEventListeners = () => {
  // Notes UI (index.html uses addNoteBtn, noteEditor, noteText, saveNoteBtn, cancelNoteBtn)
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteEditor = document.getElementById("noteEditor");
  const noteTextEl = document.getElementById("noteText");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const cancelNoteBtn = document.getElementById("cancelNoteBtn");

  if (addNoteBtn && noteEditor && noteTextEl) {
    addNoteBtn.addEventListener("click", () => {
      noteEditor.classList.remove("hidden");
      noteTextEl.focus();
    });
  }

  if (saveNoteBtn && noteTextEl) {
    saveNoteBtn.addEventListener("click", () => {
      const text = noteTextEl.value.trim();
      if (!text) return alert("Catatan tidak boleh kosong!");
      dataManager.addNote(text);
      noteTextEl.value = "";
      if (noteEditor) noteEditor.classList.add("hidden");
      renderNotes();
    });
  }

  if (cancelNoteBtn && noteTextEl && noteEditor) {
    cancelNoteBtn.addEventListener("click", () => {
      noteTextEl.value = "";
      noteEditor.classList.add("hidden");
    });
  }

  // Hapus / Edit Note (delegation)
  if (notesContainer) {
    notesContainer.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      const id = Number(target.dataset.id);
      if (target.classList.contains("delete-note-btn")) {
        dataManager.deleteNote(id);
        renderNotes();
      } else if (target.classList.contains("edit-note-btn")) {
        const note = dataManager.notes.find((n) => n.id === id);
        const newText = prompt("Edit catatan:", note ? note.text : "");
        if (newText !== null) {
          dataManager.updateNote(id, newText);
          renderNotes();
        }
      }
    });
  }

  // Events UI (index.html uses addEventBtn, eventForm, eventName, eventTime, eventLocation, saveEventBtn, cancelEventBtn)
  const addEventBtn = document.getElementById("addEventBtn");
  const eventForm = document.getElementById("eventForm");
  const eventNameEl = document.getElementById("eventName");
  const eventTimeEl = document.getElementById("eventTime");
  const eventLocationEl = document.getElementById("eventLocation");
  const saveEventBtn = document.getElementById("saveEventBtn");
  const cancelEventBtn = document.getElementById("cancelEventBtn");

  if (addEventBtn && eventForm) {
    addEventBtn.addEventListener("click", () => {
      eventForm.classList.remove("hidden");
      if (eventTimeEl) eventTimeEl.focus();
    });
  }

  if (saveEventBtn && eventNameEl && eventTimeEl && eventLocationEl) {
    saveEventBtn.addEventListener("click", () => {
      const name = eventNameEl.value.trim();
      const time = eventTimeEl.value.trim();
      const location = eventLocationEl.value.trim();
      if (!name || !time || !location) return alert("Semua kolom wajib diisi!");
      dataManager.addEvent(name, time, location);
      eventNameEl.value = "";
      eventTimeEl.value = "";
      eventLocationEl.value = "";
      if (eventForm) eventForm.classList.add("hidden");
      renderEvents();
    });
  }

  if (cancelEventBtn && eventForm) {
    cancelEventBtn.addEventListener("click", () => {
      if (eventNameEl) eventNameEl.value = "";
      if (eventTimeEl) eventTimeEl.value = "";
      if (eventLocationEl) eventLocationEl.value = "";
      eventForm.classList.add("hidden");
    });
  }

  // Edit / Hapus Event (delegation on eventsContainer tbody)
  if (eventsContainer) {
    eventsContainer.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;
      const id = Number(target.dataset.id);
      if (target.classList.contains("delete-event-btn")) {
        dataManager.deleteEvent(id);
        renderEvents();
      } else if (target.classList.contains("edit-event-btn")) {
        const ev = dataManager.events.find((x) => x.id === id);
        const newName = prompt("Nama acara baru:", ev ? ev.name : "");
        const newTime = prompt("Waktu baru (mis. 09:00):", ev ? ev.time : "");
        const newLocation = prompt("Lokasi baru:", ev ? ev.location : "");
        if (newName !== null && newTime !== null && newLocation !== null) {
          dataManager.updateEvent(id, newName, newTime, newLocation);
          renderEvents();
        }
      }
    });
  }
};

// --------- Init ---------
document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
  renderEvents();
  attachEventListeners();
  fetchWeather();
  feather.replace();
});
