// ============================================
// DATA DUMMY - KELOMPOK PERPUSTAKAAN
// ============================================

const db = {
    buku: [
        {id: 1, kode: 'BK-001', judul: 'Laskar Pelangi', pengarang: 'Andrea Hirata', penerbit: 'Bentang Pustaka', tahun: 2005, kategori: 'Novel', stok: 3, rak: 'A-01', status: 'tersedia'},
        {id: 2, kode: 'BK-002', judul: 'Bumi', pengarang: 'Tere Liye', penerbit: 'Gramedia Pustaka', tahun: 2014, kategori: 'Novel', stok: 0, rak: 'A-02', status: 'dipinjam'},
        {id: 3, kode: 'BK-003', judul: 'Negeri 5 Menara', pengarang: 'Ahmad Fuadi', penerbit: 'Gramedia Pustaka', tahun: 2009, kategori: 'Novel', stok: 4, rak: 'A-03', status: 'tersedia'},
        {id: 4, kode: 'BK-004', judul: 'Dilan 1990', pengarang: 'Pidi Baiq', penerbit: 'Mizan Publishing', tahun: 2014, kategori: 'Novel', stok: 0, rak: 'A-04', status: 'dipinjam'},
        {id: 5, kode: 'BK-005', judul: 'Ayat-Ayat Cinta', pengarang: 'Habiburrahman El Shirazy', penerbit: 'Republika', tahun: 2004, kategori: 'Novel', stok: 5, rak: 'A-05', status: 'tersedia'},
        {id: 6, kode: 'BK-006', judul: 'Perahu Kertas', pengarang: 'Dee Lestari', penerbit: 'Bentang Pustaka', tahun: 2009, kategori: 'Novel', stok: 3, rak: 'A-06', status: 'tersedia'},
        {id: 7, kode: 'BK-007', judul: 'Pulang', pengarang: 'Tere Liye', penerbit: 'Republika', tahun: 2015, kategori: 'Novel', stok: 0, rak: 'A-07', status: 'dipinjam'},
        {id: 8, kode: 'BK-008', judul: 'Rindu', pengarang: 'Tere Liye', penerbit: 'Republika', tahun: 2014, kategori: 'Novel', stok: 2, rak: 'A-08', status: 'tersedia'},
        {id: 9, kode: 'BK-009', judul: 'Sang Pemimpi', pengarang: 'Andrea Hirata', penerbit: 'Bentang Pustaka', tahun: 2006, kategori: 'Novel', stok: 4, rak: 'A-09', status: 'tersedia'},
        {id: 10, kode: 'BK-010', judul: '5 cm', pengarang: 'Donny Dhirgantoro', penerbit: 'Grasindo', tahun: 2005, kategori: 'Novel', stok: 0, rak: 'A-10', status: 'dipinjam'},
    ],
    anggota: [
        {id: 1, kode: 'AG-001', nama: 'Budi Santoso', jk: 'L', alamat: 'Jl. Mawar No. 1', telp: '08123456789', email: 'budi@email.com', status: 'aktif'},
        {id: 2, kode: 'AG-002', nama: 'Ani Wulandari', jk: 'P', alamat: 'Jl. Melati No. 5', telp: '08198765432', email: 'ani@email.com', status: 'aktif'},
        {id: 3, kode: 'AG-003', nama: 'Citra Dewi', jk: 'P', alamat: 'Jl. Anggrek No. 10', telp: '08234567890', email: 'citra@email.com', status: 'aktif'},
        {id: 4, kode: 'AG-004', nama: 'Dedi Pratama', jk: 'L', alamat: 'Jl. Kenanga No. 3', telp: '08345678901', email: 'dedi@email.com', status: 'aktif'},
    ],
    peminjaman: [
        {id: 1, kode: 'PJ-001', anggota: 'Budi Santoso', kodeAnggota: 'AG-001', buku: 'Bumi', tglPinjam: '2025-05-15', tglKembali: null, status: 'dipinjam', denda: 0},
        {id: 2, kode: 'PJ-002', anggota: 'Ani Wulandari', kodeAnggota: 'AG-002', buku: 'Dilan 1990', tglPinjam: '2025-05-16', tglKembali: null, status: 'dipinjam', denda: 0},
        {id: 3, kode: 'PJ-003', anggota: 'Citra Dewi', kodeAnggota: 'AG-003', buku: 'Pulang', tglPinjam: '2025-05-17', tglKembali: null, status: 'dipinjam', denda: 0},
        {id: 4, kode: 'PJ-004', anggota: 'Dedi Pratama', kodeAnggota: 'AG-004', buku: '5 cm', tglPinjam: '2025-05-18', tglKembali: null, status: 'dipinjam', denda: 0},
    ]
};

// ============================================
// AUTHENTICATION
// ============================================

function checkAuth() {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nama');
    window.location.href = 'login.html';
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatTanggal(tgl) {
    if (!tgl) return '-';
    const d = new Date(tgl);
    return d.toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'});
}

// ============================================
// RENDER DASHBOARD
// ============================================

function renderStats() {
    const statsDiv = document.getElementById('stats');
    if (!statsDiv) return;
    
    const total = db.buku.length;
    const tersedia = db.buku.filter(b => b.status === 'tersedia').length;
    const dipinjam = db.buku.filter(b => b.status === 'dipinjam').length;
    const aktif = db.anggota.filter(a => a.status === 'aktif').length;
    
    statsDiv.innerHTML = `
        <div class="col-xl-3 col-md-6 mb-3">
            <div class="stats-card bg-purple">
                <i class="fas fa-book icon"></i>
                <div class="number">${total}</div>
                <div>Total Buku</div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-3">
            <div class="stats-card bg-green">
                <i class="fas fa-check-circle icon"></i>
                <div class="number">${tersedia}</div>
                <div>Tersedia</div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-3">
            <div class="stats-card bg-orange">
                <i class="fas fa-hand-holding icon"></i>
                <div class="number">${dipinjam}</div>
                <div>Dipinjam</div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-3">
            <div class="stats-card bg-blue">
                <i class="fas fa-users icon"></i>
                <div class="number">${aktif}</div>
                <div>Anggota</div>
            </div>
        </div>
    `;
}

function renderBukuDipinjam() {
    const tbody = document.getElementById('bukuDipinjam');
    if (!tbody) return;
    
    const dipinjam = db.peminjaman.filter(p => p.status === 'dipinjam').slice(0, 5);
    
    let html = '';
    dipinjam.forEach(p => {
        html += `
            <tr>
                <td><strong>${p.buku}</strong></td>
                <td>${p.anggota}</td>
                <td>${formatTanggal(p.tglPinjam)}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

// ============================================
// RENDER BUKU
// ============================================

function renderBukuList() {
    const tbody = document.getElementById('bukuList');
    if (!tbody) return;
    
    let html = '';
    db.buku.forEach((b, i) => {
        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${b.kode}</td>
                <td><strong>${b.judul}</strong></td>
                <td>${b.pengarang}</td>
                <td>${b.penerbit}</td>
                <td><span class="badge badge-${b.status}">${b.status}</span></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="alert('Edit ${b.judul} - demo mode')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusBuku(${b.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function hapusBuku(id) {
    if (confirm('Hapus buku ini?')) {
        db.buku = db.buku.filter(b => b.id !== id);
        renderBukuList();
    }
}

// ============================================
// RENDER ANGGOTA
// ============================================

function renderAnggotaList() {
    const tbody = document.getElementById('anggotaList');
    if (!tbody) return;
    
    let html = '';
    db.anggota.forEach((a, i) => {
        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${a.kode}</td>
                <td>${a.nama}</td>
                <td>${a.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                <td>${a.telp}</td>
                <td><span class="badge bg-${a.status === 'aktif' ? 'success' : 'danger'}">${a.status}</span></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="alert('Edit ${a.nama} - demo mode')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusAnggota(${a.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function hapusAnggota(id) {
    if (confirm('Hapus anggota ini?')) {
        db.anggota = db.anggota.filter(a => a.id !== id);
        renderAnggotaList();
    }
}

// ============================================
// RENDER PEMINJAMAN
// ============================================

function renderPeminjamanList() {
    const tbody = document.getElementById('peminjamanList');
    if (!tbody) return;
    
    let html = '';
    db.peminjaman.forEach(p => {
        html += `
            <tr>
                <td>${p.kode}</td>
                <td>${p.anggota} (${p.kodeAnggota})</td>
                <td>${formatTanggal(p.tglPinjam)}</td>
                <td>${p.tglKembali ? formatTanggal(p.tglKembali) : '-'}</td>
                <td><span class="badge bg-${p.status === 'dipinjam' ? 'warning' : 'success'}">${p.status}</span></td>
                <td>Rp ${p.denda.toLocaleString('id-ID')}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

// ============================================
// RENDER BUKU DIPINJAM (CARD + TABLE)
// ============================================

function renderDipinjamCards() {
    const container = document.getElementById('dipinjamCards');
    if (!container) return;
    
    const dipinjam = db.peminjaman.filter(p => p.status === 'dipinjam');
    
    let html = '';
    dipinjam.forEach(p => {
        const hari = Math.floor((new Date() - new Date(p.tglPinjam)) / (1000 * 60 * 60 * 24));
        const terlambat = hari > 7;
        
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="book-card">
                    <div class="book-cover"><i class="fas fa-book-open"></i></div>
                    <span class="book-status bg-${terlambat ? 'danger' : 'warning'} text-white">
                        ${terlambat ? 'Terlambat ' + (hari - 7) + ' hari' : (hari < 7 ? (7 - hari) + ' hari lagi' : 'Hari ini')}
                    </span>
                    <div class="book-info">
                        <h5>${p.buku}</h5>
                        <hr>
                        <div class="d-flex align-items-center mb-2">
                            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:35px;height:35px;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="ms-2">
                                <small class="text-muted d-block">Dipinjam oleh</small>
                                <strong>${p.anggota}</strong>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <small class="text-muted"><i class="fas fa-calendar me-1"></i>${formatTanggal(p.tglPinjam)}</small>
                            <button class="btn btn-success btn-sm" onclick="kembalikan(${p.id})">
                                <i class="fas fa-undo me-1"></i>Kembalikan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderDipinjamTable() {
    const tbody = document.getElementById('dipinjamTable');
    if (!tbody) return;
    
    const dipinjam = db.peminjaman.filter(p => p.status === 'dipinjam');
    
    let html = '';
    dipinjam.forEach(p => {
        const hari = Math.floor((new Date() - new Date(p.tglPinjam)) / (1000 * 60 * 60 * 24));
        const terlambat = hari > 7;
        
        html += `
            <tr>
                <td>${p.kode}</td>
                <td><strong>${p.buku}</strong></td>
                <td>${p.anggota}</td>
                <td>${formatTanggal(p.tglPinjam)}</td>
                <td>${hari} hari</td>
                <td><span class="badge bg-${terlambat ? 'danger' : 'warning'}">${terlambat ? 'Terlambat' : 'Dalam Pinjaman'}</span></td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="kembalikan(${p.id})"><i class="fas fa-undo"></i></button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function kembalikan(id) {
    if (!confirm('Kembalikan buku ini?')) return;
    
    const p = db.peminjaman.find(x => x.id === id);
    if (!p) return;
    
    p.status = 'dikembalikan';
    p.tglKembali = new Date().toISOString().split('T')[0];
    
    // Hitung denda
    const tglPinjam = new Date(p.tglPinjam);
    const tglKembali = new Date(tglPinjam);
    tglKembali.setDate(tglKembali.getDate() + 7);
    const sekarang = new Date();
    
    if (sekarang > tglKembali) {
        const diff = Math.floor((sekarang - tglKembali) / (1000 * 60 * 60 * 24));
        p.denda = diff * 1000;
    }
    
    // Update stok buku
    const buku = db.buku.find(b => b.judul === p.buku);
    if (buku) {
        buku.stok++;
        buku.status = 'tersedia';
    }
    
    alert('Buku dikembalikan!' + (p.denda > 0 ? ' Denda: Rp ' + p.denda.toLocaleString('id-ID') : ''));
    renderDipinjamCards();
    renderDipinjamTable();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Cek auth kecuali di login/index
    const url = window.location.href;
    if (!url.includes('login.html') && !url.includes('index.html')) {
        checkAuth();
    }
    
    // Render semua komponen
    renderStats();
    renderBukuDipinjam();
    renderBukuList();
    renderAnggotaList();
    renderPeminjamanList();
    renderDipinjamCards();
    renderDipinjamTable();
});