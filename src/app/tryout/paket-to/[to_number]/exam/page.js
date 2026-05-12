"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { saveTryoutResult } from "@/lib/saveResult"

// Soal TWK (35 soal placeholder)
const TWK_QUESTIONS = [
  { question: "Pembukaan UUD 1945 dalam kaitannya dengan HAM adalah ...", options: ["Piagam HAM Indonesia", "Sumber HAM Indonesia", "Pedoman pelaksanaan jaminan HAM Indonesia", "Penjelasan pelaksanaan HAM Indonesia", "Rumusan pelaksanaan HAM"], answer: 0 },
  { question: "Yang menjadi causal final dari Pancasila adalah ...", options: ["Piagam Jakarta", "Bangsa Indonesia", "Warga Negara Indonesia", "BPUPKI", "PPKI"], answer: 0 },
  { question: "Yang bukan termasuk prinsip dasar negara yang diusulkan oleh Soekarno pada tanggal 1 Juni 1945 adalah ...", options: ["Demokrasi", "Kekeluargaan", "Perikemanusiaan", "Kesejahteraan sosial", "Kebangsaan"], answer: 1 },
  { question: "Berdasarkan TAP MPRS No. XX/MPRS/1966, Pancasila menempati tempat tertinggi sebagai hukum dasar negara RI, karena Pancasila merupakan ...", options: ["Dokumen historis", "Alat pemersatu bangsa", "Nilai luhur dari nenek moyang", "Landasan perjuangan bangsa", "Dasar negara dan pandangan hidup bangsa Indonesia"], answer: 4 },
  { question: "Yang diatur oleh hukum dasar negara adalah ...", options: ["Susunan organisasi suatu negara", "Membatasi tugas dan wewenang badan-badan negara", "Menjaga/mengatur hubungan vertikal antara badan-badan negara", "Menjaga/mengatur hubungan horizontal antar badan-badan negara", "Semua jawaban benar"], answer: 4 },
  { question: "Yang bukan merupakan dampak/akibat dari Dekrit Presiden 5 Juli 1959 adalah ...", options: ["Konstituante dibubarkan", "UUD tidak berlaku", "Kembali ke UUD 1945", "Dibentuk DPRS", "Dibentuk DPAS"], answer: 3 },
  { question: "Yang bukan merupakan alat-alat perlengkapan MPR adalah ...", options: ["Pimpinan MPR", "Badan pekerja MPR", "Pembantu MPR", "Komisi MPR", "Panitia Ad Hoc MPR"], answer: 2 },
  { question: "Menteri-menteri negara adalah pembantu presiden. Hal tersebut diatur dalam UUD 1945, yaitu ...", options: ["Pasal 18", "Pasal 19", "Pasal 17", "Pasal 16", "Pasal 15"], answer: 2 },
  { question: "Berkenaan dengan perubahan isi dari UUD 1945 sebenarnya telah diatur oleh TAP MPR No. IV/MPR/1983 tentang ...", options: ["Interpelasi", "Budget", "Referendum", "Mosi tidak percaya", "Angket"], answer: 2 },
  { question: "Penyebab utama menyerahnya Jepang kepada Sekutu adalah ...", options: ["Jepang tidak mendapat dukungan rakyat Indonesia", "Jepang kehabisan bala tentara", "Kaisar Jepang tidak lagi menginginkan perang", "Pemimpin Jepang banyak gugur", "Kota Hiroshima dan Nagasaki dibom atom oleh Amerika Serikat"], answer: 4 },
  { question: "Sehari setelah proklamasi, PPKI mengadakan sidang pertama, hasil sidang tersebut adalah ...", options: ["Mengesahkan UUD menjadi UUD 1945", "Menetapkan Soekarno dan Hatta sebagai presiden dan wakil presiden", "Presiden sementara dibantu Komite Nasional", "Dibentuknya DPR dan MPR", "A,B, dan C benar"], answer: 4 },
  { question: "Buku Max Havelaar dikarang oleh ...", options: ["Van den Bosch", "Douwes Dekker", "Raffles", "Daendels", "J.P. Coen"], answer: 1 },
  { question: "Alasan dikeluarkannya Deklarasi Djuanda adalah ...", options: ["Mempertahankan NKRI", "Menciptakan kawasan damai dalam gagasan Wawasan Nusantara", "Melindungi kekayaan negara Indonesia", "Memberikan kenyamanan pemerintah untuk menindak pelanggaran laut", "Melindungi wilayah kepulauan RI"], answer: 2 },
  { question: "Untuk mendapatkan keadilan pertama bagi rakyat adalah pada tingkat pengadilan negeri, sedangkan Pengadilan Tinggi dan Mahkamah Agung berfungsi sebagai ...", options: ["Peradilan banding dan kasasi", "Peradilan istimewa", "Peradilan KKN", "Peradilan perkara berat", "Peradilan khusus"], answer: 0 },
  { question: "Mahkamah Agung mempunyai hak untuk menguji terhadap peraturan perundangan yang berlaku, kecuali ...", options: ["Peraturan Pemerintah", "Keputusan Presiden", "Keputusan Menteri", "Peraturan Daerah", "Undang-undang buatan DPR"], answer: 3 },
  { question: "Dalam dinamika ketatanegaraan Indonesia berlangsung yang tidak pernah mengalami perubahan adalah ...", options: ["Bentuk negara", "Bentuk pemerintahan", "Corak pemerintahan", "Lembaga negara", "Sistem demokrasi"], answer: 4 },
  { question: "Sistem pemerintahan kabinet presidensil ditandai oleh ...", options: ["Kepala negara seorang presiden", "Presiden merupakan kepala pemerintahan", "Kedudukan kabinet sejajar dengan parlemen", "Presiden memegang kekuasaan tertinggi", "Adanya wakil presiden"], answer: 1 },
  { question: "Ada bermacam istilah demokrasi, demokrasi yang menonjolkan kebebasan individu adalah ...", options: ["Demokrasi langsung", "Demokrasi tidak langsung", "Demokrasi terpimpin", "Demokrasi liberal", "Demokrasi Pancasila"], answer: 3 },
  { question: "Hukum administrasi negara merupakan bagian dari hukum tata negara dalam arti luas, karena hukum administrasi negara adalah ...", options: ["Sekumpulan peraturan hukum yang mengikat badan negara", "Peraturan pelanggaran pegawai negeri", "Peraturan pemberhentian pegawai negeri", "Peraturan pengangkatan pegawai negeri", "Peraturan mengenai tugas pegawai negeri"], answer: 0 },
  { question: "Proses pembuatan ketetapan MPR tahap II adalah ...", options: ["Pembahasan rapat paripurna Majelis", "Pembahasan keputusan rapat paripurna Majelis", "Pembahasan oleh Badan Pekerja Majelis", "Pembahasan komisi/panitia Ad Hoc", "Pengambilan keputusan rapat paripurna"], answer: 2 },
  { question: "Karena berhasil mengalahkan Portugis, Fatahillah mengganti nama Sunda Kelapa menjadi ...", options: ["Batavia", "Jakarta", "Jayakarta", "Betawi", "Jawa Barat"], answer: 2 },
  { question: "Agama Islam di Indonesia berkembang di daerah pesisir Sumatra dan Jawa karena ...", options: ["Pesisir udaranya sejuk", "Daerah pesisir padat penduduk", "Disebarkan melalui perdagangan laut", "Penduduk pesisir masih bodoh", "Merupakan pusat kerajaan"], answer: 2 },
  { question: "Konferensi Meja Bundar diselenggarakan di kota ...", options: ["Amsterdam", "Den Haag", "Belgium", "Kolombo", "New York"], answer: 1 },
  { question: "Finalis Tujuh Keajaiban Dunia berikut yang berasal dari negara Spanyol adalah ...", options: ["Machu Picchu", "Acropolis", "Stonehenge", "Alhambra", "Timbuktu"], answer: 3 },
  { question: "Yang bukan merupakan negara bagian Amerika Serikat adalah ...", options: ["Idaho", "Wyoming", "Roskilde", "Delaware", "Colorado"], answer: 2 },
  { question: "Lagu daerah Potong Bebek Angsa berasal dari provinsi ...", options: ["Nusa Tenggara Barat", "Nusa Tenggara Timur", "Maluku", "Papua", "Kalimantan Barat"], answer: 1 },
  { question: "Perang Dunia I berakhir pada tahun ...", options: ["1914", "1916", "1918", "1921", "1924"], answer: 2 },
  { question: "PBI adalah organisasi nasional untuk olahraga ...", options: ["Bowling", "Bridge", "Bulu tangkis", "Baseball", "Berkuda"], answer: 0 },
  { question: "Kerajaan Sriwijaya terkenal sebagai kerajaan maritim karena ...", options: ["Mempunyai armada laut kuat", "Mengadakan hubungan dagang", "Menjadi pusat perdagangan Asia Tenggara", "Letak persimpangan perdagangan", "Memiliki raja berkuasa"], answer: 0 },
  { question: "Tujuan diselenggarakannya Konferensi Asia Afrika di antaranya ...", options: ["Ikut mengawasi perdamaian dunia", "Mempererat persatuan Asia", "Mempersatukan kerja sama Asia", "Mempererat persatuan dan mengawasi perdamaian dunia", "Meredakan ketegangan blok Barat dan Timur"], answer: 2 },
  { question: "Setelah Perang Dunia II berakhir muncul dua kekuatan yaitu Blok Barat dan Blok Timur. Blok Barat dipimpin oleh ...", options: ["Inggris", "Perancis", "Amerika Serikat", "Kanada", "Belanda"], answer: 2 },
  { question: "Sebagian naskah kuno dari Provinsi Lampung diketahui tersimpan di lembaga luar negeri. Unsur what pada teks tersebut adalah ...", options: ["Keprihatinan terhadap naskah kuno Lampung", "Museum Negeri Lampung menyimpan naskah kuno", "Naskah kuno Lampung sebagian tersimpan di luar negeri", "Naskah kuno Lampung memakai bahasa kuno", "Penyesalan karena naskah kuno Lampung ada di luar negeri"], answer: 2 },
  { question: "Kalimat berikut ini adalah baku, kecuali ...", options: ["Berdasarkan data Pemprov Lampung naskah kuno tersebar di Belanda Denmark Inggris dan Jerman", "Di Leiden setidaknya ada 5 naskah kuno", "Anggaran pengadaan koleksi baru benda bersejarah di museum hanya Rp 40-70 juta setahun", "Penambahan koleksi benda bersejarah di museum negeri Lampung terkendala dana", "Ia mencontohkan suatu ketika pernah membeli uang kuno eks Karasidenan Lampung"], answer: 2 },
  { question: "Akar tanaman bakau melengkung besar-besar. Kata reduplikasi yang bermakna sama adalah ...", options: ["Program KB membatasi jumlah anak-anak dalam keluarga", "Lulusan Perguruan Tinggi dalam negeri tidak kalah pintar", "Aku tidak menerima telepon malam-malam", "Pada jam istirahat kami makan-makan", "Bila ada uang adik kecil itu berbelanja"], answer: 1 },
  { question: "Penulisan nama dan gelar yang benar adalah ...", options: ["Sutinah Pertiwi, S.E", "Moh Indrawan Setyo Hadi M.Pd", "Hj Rusti Saringsih", "Dr Laila Sari Devi", "Rusti Hadiningrat, S.S"], answer: 3 },
]

// Soal TIU (30 soal placeholder)
const TIU_QUESTIONS = [
  { question: "GETIR = ...", options: ["Manis", "Sakit", "Pedas", "Nyeri", "Pahit"], answer: 4 },
  { question: "BANDELA = ...", options: ["Peti kemas", "Bendera", "Lambang", "Simbol", "Umbul-umbul"], answer: 0 },
  { question: "MUKADIMAH = ...", options: ["Atas", "Pengantar", "Penutup", "Isi", "Pembukaan"], answer: 4 },
  { question: "SINKRON >< ...", options: ["Selaras", "Serasi", "Berbeda", "Harmonis", "Sesuai"], answer: 2 },
  { question: "NEKAT >< ...", options: ["Niat", "Motif", "Maksud", "Berani", "Takut"], answer: 4 },
  { question: "ELEKTRIK >< ...", options: ["Tunjuk", "Campur", "Kolot", "Pilih", "Tak pilih-pilih"], answer: 4 },
  { question: "BURUNG : SARANG = ... : ...", options: ["Orang : Rumah", "Murid : Sekolah", "Dompet : Uang", "Kandang : Kambing", "Rapat : Gedung"], answer: 0 },
  { question: "SELASA : KAMIS = ... : ...", options: ["Januari : Maret", "Menit : Jam", "Jam : Hari", "Mei : Agustus", "Gelap : Terang"], answer: 0 },
  { question: "DINAR : SENA = ... : ...", options: ["Kakak : Anak", "Barat : Selatan", "Siang : Malam", "Sepatu : Tas", "Menit : Detik"], answer: 4 },
  { question: "BURUNG : EKOR = ... : ...", options: ["Gajah : Belalai", "Kapal : Buritan", "Kucing : Bulu", "Harimau : Taring", "Rusa : Tanduk"], answer: 1 },
  { question: "Kartamarta menjual mobilnya Rp 10.000.000 dan rugi 66 2/3%. Berapakah harga beli mobil tersebut?", options: ["Rp 30.000.000", "Rp 33.000.000", "Rp 34.000.000", "Rp 35.000.000", "Rp 12.000.000"], answer: 0 },
  { question: "Biaya mengecat dinding tinggi 4 m dan panjang 13 m jika biaya Rp 4.500 per m² adalah ...", options: ["Rp 207.000", "Rp 216.000", "Rp 225.000", "Rp 234.000", "Rp 243.000"], answer: 3 },
  { question: "Jika bekerja 6 jam mulai pukul 08.00 maka selesai pada pukul ...", options: ["14.45", "12.00", "13.30", "02.00", "14.00"], answer: 4 },
  { question: "Volume maksimum selokan berbentuk trapesium dengan panjang 15 m dan tinggi 0,2 m adalah ...", options: ["6750 m³", "675 m³", "67,5 m³", "6,75 m³", "0,675 m³"], answer: 3 },
  { question: "Himpunan penyelesaian dari 3x - 4 > 5 + 2x adalah ...", options: ["x < 9", "x < 1", "x > -9", "x > 9", "x > -1"], answer: 3 },
  { question: "Jika x = 2,4 − 1,98 + 0,009 dan y = 5,08 maka ...", options: ["x = y", "x < y", "x > y", "x ≠ y", "x ≥ y"], answer: 1 },
  { question: "Pada seleksi CPNS terdapat 200 peserta dengan perbandingan tertentu. Persentase perempuan di kehutanan adalah ...", options: ["10%", "15%", "20%", "34%", "41%"], answer: 2 },
  { question: "Jika nilai 90 belajar 12 jam/hari, maka nilai 60 belajar ...", options: ["112,5 jam", "24 jam", "18 jam", "8 jam", "6 jam"], answer: 3 },
  { question: "Durna berjalan 2 jam menempuh 8,7 km. Pada setengah jam ke-4 jarak yang ditempuh adalah ...", options: ["25 m", "50 m", "100 m", "150 m", "200 m"], answer: 4 },
  { question: "Mobil menempuh 7 km dalam 15 menit. Rata-rata jarak dalam 1 jam adalah ...", options: ["20 km", "22 km", "24 km", "26 km", "28 km"], answer: 4 },
  { question: "Jika rata-rata nilai 100 dan jumlah siswa berubah maka nilai kelas I adalah ...", options: ["83,33", "125", "60", "40", "50"], answer: 2 },
  { question: "Berapakah nilai x dari (1/2 + 1/3 − x)/3 = 16?", options: ["1/3", "1/4", "1/5", "1/2", "3/4"], answer: 0 },
  { question: "A C E G I ...", options: ["K dan M", "J dan L", "K dan N", "J dan N", "K dan J"], answer: 0 },
  { question: "A B D G K ...", options: ["O dan V", "M dan O", "O dan N", "N dan O", "O"], answer: 0 },
  { question: "212, 101, 111, 212, -101, -111, -212, ...", options: ["111, -212", "-111, 101", "-101, 111", "-111, -212", "-101, 111"], answer: 3 },
  { question: "Semua pohon bercabang dan berakar. Tanaman A berakar tetapi tidak bercabang. Kesimpulan ...", options: ["A adalah pohon", "A bukan pohon", "A pohon tidak bercabang", "A pohon tidak berakar", "A bukan pohon bercabang"], answer: 1 },
  { question: "Semua santri pandai bahasa Arab. Sebagian santri pandai pidato. Kesimpulan ...", options: ["Sebagian santri tidak suka matematika", "Sebagian santri suka matematika", "Sebagian santri suka matematika tetapi tidak pandai bahasa Arab", "Sebagian santri suka matematika dan tidak pandai bahasa Arab", "Sebagian santri suka matematika tetapi tidak suka bahasa Arab"], answer: 0 },
  { question: "Semua wanita senang perhiasan dan kosmetik. A tidak senang kosmetik tetapi senang perhiasan. Maka ...", options: ["A wanita tidak senang kosmetik", "A wanita senang perhiasan", "A wanita tidak senang kosmetik meskipun senang perhiasan", "A bukan wanita meskipun senang perhiasan", "A bukan wanita tetapi senang kosmetik"], answer: 3 },
  { question: "Ada ada kecil pun ada. Makna peribahasa adalah ...", options: ["Harta benda bukan yang utama", "Bersenang hati dengan apa yang didapat", "Uang sedikit lebih baik daripada tidak ada", "Memberi manfaat walaupun sedikit", "Bersyukur atas nikmat"], answer: 1 },
  { question: "Seperti anjing menggonggong tulang. Maknanya ...", options: ["Orang loba tidak pernah puas", "Keserakahan membuat manusia seperti hewan", "Manusia selalu tidak puas", "Manusia selalu ingin mendapatkan sesuatu", "Orang yang ingin menunjukkan kelebihan"], answer: 0 },
]

// Soal TKP (35 soal placeholder)
const TKP_QUESTIONS = [
  { question: "Ketika saya mengalami kegagalan, saya cenderung ...", options: ["Merasa bodoh dan putus asa", "Merasa sedih dan marah", "Mencari sumber kegagalan saya", "Biasa saja seperti tidak terjadi apa-apa", "Melupakan kegagalan dan menatap ke depan"], score: [2,3,5,4,1] },
  { question: "Teman-teman senang menceritakan masalah mereka kepada saya karena menurut mereka saya ...", options: ["Mampu menjaga rahasia", "Pendengar yang baik", "Memberikan solusi terbaik", "Bisa melihat masalah dari berbagai sudut pandang", "Mampu menumbuhkan semangat mereka"], score: [4,5,3,2,1] },
  { question: "Di kantor saya ditugaskan di bagian pelayanan dan ada tamu yang sangat rewel. Saya akan ...", options: ["Melayani dengan malas-malasan", "Meminta teman lain melayaninya", "Melayani dengan sabar dan memberi yang terbaik", "Melaporkan kepada atasan", "Melayani sebisanya saja"], score: [1,2,5,4,3] },
  { question: "Saya sudah bekerja lama tetapi belum mendapat promosi jabatan. Sikap saya ...", options: ["Menganggap ada ketidakadilan", "Menunggu kesempatan datang", "Meningkatkan kinerja agar mendapat kesempatan", "Bekerja seperti biasa", "Memutuskan keluar"], score: [1,3,5,4,2] },
  { question: "Saya sangat senang dengan atasan yang ...", options: ["Dekat dengan bawahan", "Disiplin dan mempunyai etos kerja tinggi", "Bertanggung jawab", "Mau mendengarkan masukan bawahan", "Memberi arahan yang jelas"], score: [3,5,4,2,1] },
  { question: "Saat hari libur atasan menghubungi saya terkait pekerjaan penting. Saya akan ...", options: ["Mengabaikan telepon", "Mengangkat telepon jika penting", "Mengangkat telepon dan membantu", "Menunda membalas", "Menyuruh orang lain menjawab"], score: [1,3,5,2,4] },
  { question: "Ketika suasana hati saya sedang tidak baik biasanya saya ...", options: ["Mudah marah", "Menjadi malas bekerja", "Tetap bekerja sebaik mungkin", "Sering melamun", "Bercerita kepada teman"], score: [1,2,5,3,4] },
  { question: "Orang tua menyarankan saya pindah kerja karena gaji lebih besar. Saya akan ...", options: ["Mencari pekerjaan lain", "Mempertimbangkan saran", "Tetap bekerja dan memberi penjelasan", "Meminta saran teman", "Meminta pertimbangan atasan"], score: [4,3,5,2,1] },
  { question: "Teman saya mengingkari janji untuk mengembalikan uang yang dipinjam. Saya akan ...", options: ["Memarahinya", "Mengingatkannya dengan baik", "Tidak meminjamkan lagi", "Tidak berteman lagi", "Mencari penjelasan"], score: [1,4,3,2,5] },
  { question: "Di kantor saya termasuk orang yang ...", options: ["Supel dan mudah akrab", "Disiplin dan pekerja keras", "Ulet dan pantang menyerah", "Pintar dan cepat bekerja", "Bertanggung jawab"], score: [3,5,4,2,1] },
  { question: "Saya sangat membutuhkan buku mahal untuk pekerjaan saya. Saya akan ...", options: ["Menabung untuk membelinya", "Meminta kantor membelikan", "Menunggu sampai ada uang", "Meminjam uang teman", "Mencari pekerjaan tambahan"], score: [5,4,2,3,1] },
  { question: "Sahabat lama datang ingin menginap di rumah saya yang sederhana. Saya akan ...", options: ["Menolak dengan alasan rumah kecil", "Mengizinkan sebentar", "Menjelaskan kondisi rumah", "Menyarankan hotel", "Menerima dengan apa adanya"], score: [1,3,4,2,5] },
  { question: "Saat ada pekerjaan kelompok biasanya ...", options: ["Semua anggota aktif", "Tidak semua bekerja", "Saya yang menyelesaikan", "Saling mengandalkan", "Pekerjaan selesai jika ada yang mulai"], score: [5,2,4,1,3] },
  { question: "Saat menerima pekerjaan besar saya ...", options: ["Berusaha menyelesaikan sebaik mungkin", "Merasa malas", "Takut tidak selesai", "Meminta bantuan teman", "Menganggap biasa"], score: [5,1,2,4,3] },
  { question: "Saat presentasi saya mendapat kabar anak sakit. Saya akan ...", options: ["Tetap melanjutkan presentasi", "Mencari tahu kondisi anak", "Menghentikan presentasi", "Menyerahkan pada rekan", "Menelepon keluarga"], score: [4,5,1,3,2] },
  { question: "Atasan memberi informasi rahasia. Saya akan ...", options: ["Menceritakan ke teman", "Memberi tahu tanpa isi informasi", "Menyimpannya", "Menghindari membicarakan", "Memberi tahu sebagian"], score: [1,3,5,4,2] },
  { question: "Cara mencapai sukses dalam pekerjaan adalah ...", options: ["Bekerja dengan sepenuh hati", "Mematuhi perintah atasan", "Bekerja dengan giat", "Menyingkirkan pesaing", "Bekerja tanpa mengenal waktu"], score: [5,4,3,1,2] },
  { question: "Jika terjadi perombakan direksi perusahaan saya ...", options: ["Tidak peduli", "Cuma pegawai biasa", "Percaya keputusan direksi", "Bekerja lebih giat", "Mendukung kemajuan perusahaan"], score: [2,1,4,3,5] },
  { question: "Atasan memindahkan saya ke bagian lain. Saya ...", options: ["Mengerjakan tugas saja", "Menolak pindah", "Menerima tapi kecewa", "Mengenal rekan baru", "Menerima dengan baik"], score: [3,1,2,4,5] },
  { question: "Menurut saya orang baik adalah ...", options: ["Menepati janji", "Menolong orang", "Memaafkan kesalahan", "Tidak berbuat jahat", "Mengemban amanah"], score: [3,4,2,1,5] },
  { question: "Pimpinan kantor sangat mendikte karyawan. Saya ...", options: ["Mengajak demonstrasi", "Bukan urusan saya", "Menyurati pimpinan", "Berdiskusi dengan pimpinan", "Mengajak melawan"], score: [1,2,3,5,4] },
  { question: "Dalam pekerjaan saya biasanya ...", options: ["Menunggu perintah", "Mengambil keputusan sendiri", "Bertanggung jawab", "Mendengar saran", "Mengambil keputusan tepat"], score: [2,3,5,4,1] },
  { question: "Saat rapat ada teman yang membuat gaduh. Saya ...", options: ["Marah", "Mengingatkan", "Menghentikan rapat", "Menunda rapat", "Melanjutkan rapat"], score: [1,5,2,3,4] },
  { question: "Teman baru memiliki bayi dan saya tidak punya uang membeli kado. Saya ...", options: ["Tidak memberi kado", "Mengunjungi tanpa kado", "Memberi kado nanti", "Tidak mengunjungi", "Meminjam uang"], score: [3,5,4,1,2] },
  { question: "Tempat kerja saya mengalami pergantian kepala kantor. Saya ...", options: ["Mendukung kepala kantor baru", "Tidak peduli", "Kurang semangat", "Menyesuaikan diri", "Tidak mempermasalahkan"], score: [5,2,1,4,3] },
  { question: "Dalam bekerja saya sangat senang jika ...", options: ["Tempat kerja nyaman", "Mendapat penghargaan", "Rekan kerja kompak", "Pimpinan memahami bawahan", "Gaji besar"], score: [4,3,5,2,1] },
  { question: "Atasan memberi pekerjaan berat. Saya ...", options: ["Menolak", "Menerima terpaksa", "Minta dipertimbangkan", "Tertarik menyelesaikan", "Mendelegasikan"], score: [1,2,3,5,4] },
  { question: "Saya mendapatkan keberhasilan karena ...", options: ["Tidak menyerah", "Bernasib baik", "Berani mengambil risiko", "Lingkungan mendukung", "Berusaha keras"], score: [4,1,3,2,5] },
  { question: "Ketika menghadapi masalah saya ...", options: ["Tidak bersemangat", "Mudah marah", "Bercerita pada teman", "Bingung", "Tetap tenang"], score: [2,1,3,4,5] },
  { question: "Atasan meminta lembur saat saya ada janji pribadi. Saya ...", options: ["Menolak", "Menerima dan membatalkan janji", "Menyarankan orang lain", "Menerima dan meminta bantuan", "Menyelesaikan urusan dulu lalu kembali"], score: [1,3,2,4,5] },
  { question: "Saya mendapat penghargaan kerja. Saya ...", options: ["Memamerkannya", "Bekerja seperti biasa", "Meningkatkan kinerja", "Memotivasi rekan kerja", "Menjaga kepercayaan"], score: [1,3,4,5,2] },
  { question: "Saya bekerja dalam tim yang anggotanya berbeda pendapat. Saya ...", options: ["Mengalah", "Mencari solusi bersama", "Diam saja", "Membela pendapat saya", "Mengikuti mayoritas"], score: [2,5,1,3,4] },
  { question: "Ketika tugas menumpuk saya ...", options: ["Panik", "Mengeluh", "Menyusun prioritas", "Menunda", "Mengerjakan sedikit"], score: [1,2,5,3,4] },
  { question: "Jika rekan kerja kesulitan pekerjaan saya ...", options: ["Membantu jika sempat", "Membiarkan", "Membantu sampai selesai", "Menyarankan solusi", "Menyuruhnya belajar sendiri"], score: [3,1,5,4,2] },
  { question: "Jika target kerja sulit dicapai saya ...", options: ["Menyerah", "Mencari alasan", "Berusaha lebih keras", "Mencari bantuan", "Mengerjakan seadanya"], score: [1,2,5,4,3] },
]

// Gabungkan semua soal dengan label subtest
const ALL_QUESTIONS = [
  ...TWK_QUESTIONS.map((q, i) => ({ ...q, subtest: "TWK", subtestIndex: i, type: "twk" })),
  ...TIU_QUESTIONS.map((q, i) => ({ ...q, subtest: "TIU", subtestIndex: i, type: "tiu" })),
  ...TKP_QUESTIONS.map((q, i) => ({ ...q, subtest: "TKP", subtestIndex: i, type: "tkp" })),
]

const TWK_COUNT = TWK_QUESTIONS.length  // 35
const TIU_START = TWK_COUNT             // 35
const TKP_START = TWK_COUNT + TIU_QUESTIONS.length  // 65

export default function PaketTOExam() {
  const router = useRouter()
  const params = useParams()
  const toNumber = params.to_number

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [doubts, setDoubts] = useState({})
  const [time, setTime] = useState(90 * 60)
  const [checking, setChecking] = useState(true)

  // Cek akses
  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace(`/login?redirect=/tryout/paket-to/${toNumber}/exam`); return }
      const { data } = await supabase
        .from("user_tryouts")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("to_number", parseInt(toNumber))
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      if (!data) { router.replace(`/tryout/paket-to/${toNumber}`); return }
      setChecking(false)
    }
    checkAccess()
  }, [])

  // Load saved answers
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`to_${toNumber}_answers`)
      if (saved) setAnswers(JSON.parse(saved))
    } catch (e) { localStorage.removeItem(`to_${toNumber}_answers`) }
  }, [])

  // Save answers
  useEffect(() => {
    localStorage.setItem(`to_${toNumber}_answers`, JSON.stringify(answers))
  }, [answers])

  // Timer
  useEffect(() => {
    if (checking) return
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { clearInterval(timer); submitExam(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [checking, answers])

  function formatTime() {
    const h = Math.floor(time / 3600)
    const m = Math.floor((time % 3600) / 60)
    const s = time % 60
    if (h > 0) return `${h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  function selectAnswer(i) {
    setAnswers({ ...answers, [current]: i })
  }

  function toggleDoubt() {
    setDoubts({ ...doubts, [current]: !doubts[current] })
  }

  async function submitExam(force = false) {
    if (!force) {
      if (!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
    }

    // Hitung skor per subtest
    let twkScore = 0, twkCorrect = 0, twkWrong = 0, twkEmpty = 0
    let tiuScore = 0, tiuCorrect = 0, tiuWrong = 0, tiuEmpty = 0
    let tkpScore = 0, tkpAnswered = 0, tkpEmpty = 0

    ALL_QUESTIONS.forEach((q, i) => {
      const ans = answers[i]
      if (q.type === "twk") {
        if (ans === undefined) { twkEmpty++ }
        else if (ans === q.answer) { twkScore += 5; twkCorrect++ }
        else { twkWrong++ }
      } else if (q.type === "tiu") {
        if (ans === undefined) { tiuEmpty++ }
        else if (ans === q.answer) { tiuScore += 5; tiuCorrect++ }
        else { tiuWrong++ }
      } else if (q.type === "tkp") {
        if (ans === undefined) { tkpEmpty++ }
        else { tkpScore += q.score[ans]; tkpAnswered++ }
      }
    })

    const totalScore = twkScore + tiuScore + tkpScore
    const lulusTwk = twkScore >= 65
    const lulusTiu = tiuScore >= 80
    const lulusTkp = tkpScore >= 166
    const lulusSkd = lulusTwk && lulusTiu && lulusTkp

    const resultData = {
      toNumber,
      twkScore, twkCorrect, twkWrong, twkEmpty,
      tiuScore, tiuCorrect, tiuWrong, tiuEmpty,
      tkpScore, tkpAnswered, tkpEmpty,
      totalScore, lulusTwk, lulusTiu, lulusTkp, lulusSkd,
      answers, questions: ALL_QUESTIONS
    }

    localStorage.setItem(`to_${toNumber}_result`, JSON.stringify(resultData))

    await saveTryoutResult({
      toSlug: `skd-to-${toNumber}`,
      score: totalScore,
      correct: twkCorrect + tiuCorrect,
      wrong: twkWrong + tiuWrong,
      twk: twkScore,
      tiu: tiuScore,
      tkp: tkpScore,
      lulus_twk: lulusTwk,
      lulus_tiu: lulusTiu,
      lulus_tkp: lulusTkp,
    })

    localStorage.removeItem(`to_${toNumber}_answers`)
    router.push(`/tryout/paket-to/${toNumber}/result`)
  }

  const answeredCount = Object.keys(answers).length
  const doubtCount = Object.keys(doubts).length
  const emptyCount = ALL_QUESTIONS.length - answeredCount
  const progressPercent = Math.round((answeredCount / ALL_QUESTIONS.length) * 100)

  // Subtest indicator
  const currentSubtest = ALL_QUESTIONS[current]?.subtest || "TWK"
  const subtestColor = { TWK: "#3b82f6", TIU: "#8b5cf6", TKP: "#22c55e" }

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memeriksa akses...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div className="exam-wrap" style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "row", height: "100vh", overflow: "hidden" }}>

      {/* Area Soal */}
      <div className="exam-question" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", overflowY: "auto", minWidth: 0 }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#172554", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: "0.78rem", fontWeight: 700 }}>
              TO SKD #{toNumber}
            </div>
            <div style={{ background: subtestColor[currentSubtest] + "20", color: subtestColor[currentSubtest], borderRadius: 8, padding: "5px 12px", fontSize: "0.78rem", fontWeight: 700 }}>
              {currentSubtest} — Soal {current + 1}
            </div>
            {doubts[current] && (
              <span style={{ background: "rgba(234,179,8,0.15)", color: "#ca8a04", borderRadius: 999, padding: "4px 10px", fontSize: "0.7rem", fontWeight: 600 }}>⚠ Ragu</span>
            )}
          </div>
          <div style={{ background: time <= 600 ? "rgba(220,38,38,0.1)" : "rgba(23,37,84,0.08)", borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.75rem", color: time <= 600 ? "#dc2626" : "#475569" }}>⏱</span>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: time <= 600 ? "#dc2626" : "#172554", fontVariantNumeric: "tabular-nums" }}>{formatTime()}</span>
          </div>
        </div>

        {/* Subtest progress bar */}
        <div style={{ background: "#fff", padding: "10px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 8, alignItems: "center" }}>
          {[
            { label: "TWK", start: 0, end: TWK_COUNT, color: "#3b82f6" },
            { label: "TIU", start: TIU_START, end: TKP_START, color: "#8b5cf6" },
            { label: "TKP", start: TKP_START, end: ALL_QUESTIONS.length, color: "#22c55e" },
          ].map(s => {
            const total = s.end - s.start
            const answered = Object.keys(answers).filter(k => parseInt(k) >= s.start && parseInt(k) < s.end).length
            const pct = Math.round((answered / total) * 100)
            return (
              <div key={s.label} style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: s.color }}>{s.label}</span>
                  <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{answered}/{total}</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 999, height: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: s.color, borderRadius: 999, width: `${pct}%`, transition: "width 0.3s" }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Soal */}
        <div style={{ flex: 1, padding: "24px 32px" }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
              <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: subtestColor[currentSubtest], color: "#fff", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{current + 1}</span>
              <p style={{ fontSize: "1rem", color: "#0f172a", lineHeight: 1.7, fontWeight: 500, flex: 1, paddingTop: 4 }}>{ALL_QUESTIONS[current].question}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ALL_QUESTIONS[current].options.map((opt, i) => (
                <button key={i} onClick={() => selectAnswer(i)}
                  style={{ width: "100%", textAlign: "left", padding: "13px 18px", borderRadius: 10, border: answers[current] === i ? `2px solid ${subtestColor[currentSubtest]}` : "1.5px solid #e2e8f0", background: answers[current] === i ? subtestColor[currentSubtest] : "#fff", color: answers[current] === i ? "#fff" : "#334155", fontSize: "0.9rem", fontWeight: answers[current] === i ? 600 : 400, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12 }}
                  onMouseEnter={e => { if (answers[current] !== i) { e.currentTarget.style.borderColor = subtestColor[currentSubtest]; e.currentTarget.style.background = "#f8fafc" } }}
                  onMouseLeave={e => { if (answers[current] !== i) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff" } }}
                >
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: answers[current] === i ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: answers[current] === i ? "#fff" : "#64748b", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))}
              style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#172554"; e.currentTarget.style.color = "#172554" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#334155" }}
            >← Previous</button>
            <button onClick={() => setCurrent(c => Math.min(ALL_QUESTIONS.length - 1, c + 1))}
              style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #172554", background: "#172554", color: "#fff", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1e3a5f"}
              onMouseLeave={e => e.currentTarget.style.background = "#172554"}
            >Next →</button>
            <button onClick={toggleDoubt}
              style={{ padding: "10px 20px", borderRadius: 10, border: `1.5px solid ${doubts[current] ? "#ca8a04" : "#e2e8f0"}`, background: doubts[current] ? "rgba(234,179,8,0.1)" : "#fff", color: doubts[current] ? "#ca8a04" : "#64748b", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
            >⚠ Ragu-ragu</button>
            <button onClick={() => submitExam(false)}
              style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #fbbf24", background: "#fbbf24", color: "#78350f", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", marginLeft: "auto" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
              onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
            >Submit Ujian</button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="exam-sidebar" style={{ width: "280px", flexShrink: 0, background: "#fff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "20px", overflowY: "auto" }}>
        <div style={{ background: time <= 600 ? "rgba(220,38,38,0.06)" : "#f8fafc", border: `1px solid ${time <= 600 ? "rgba(220,38,38,0.2)" : "#e2e8f0"}`, borderRadius: 12, padding: "14px", marginBottom: 14, textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontWeight: 500 }}>Waktu Tersisa</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: time <= 600 ? "#dc2626" : "#172554", fontVariantNumeric: "tabular-nums" }}>{formatTime()}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 16 }}>
          <div style={{ background: "rgba(22,163,74,0.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#16a34a", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Dijawab</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16a34a" }}>{answeredCount}</p>
          </div>
          <div style={{ background: "rgba(234,179,8,0.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#ca8a04", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Ragu</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ca8a04" }}>{doubtCount}</p>
          </div>
          <div style={{ background: "rgba(148,163,184,0.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Kosong</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#94a3b8" }}>{emptyCount}</p>
          </div>
        </div>

        {/* Daftar soal per subtest */}
        {[
          { label: "TWK", start: 0, end: TWK_COUNT, color: "#3b82f6" },
          { label: "TIU", start: TIU_START, end: TKP_START, color: "#8b5cf6" },
          { label: "TKP", start: TKP_START, end: ALL_QUESTIONS.length, color: "#22c55e" },
        ].map(s => (
          <div key={s.label} style={{ marginBottom: 14 }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${s.color}30` }}>{s.label}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
              {ALL_QUESTIONS.slice(s.start, s.end).map((q, idx) => {
                const globalIdx = s.start + idx
                let bg = "#f1f5f9", color = "#64748b", border = "1px solid #e2e8f0"
                if (globalIdx === current) { bg = s.color; color = "#fff"; border = `1px solid ${s.color}` }
                else if (doubts[globalIdx]) { bg = "rgba(234,179,8,0.15)"; color = "#ca8a04"; border = "1px solid rgba(234,179,8,0.3)" }
                else if (answers[globalIdx] != null) { bg = s.color + "20"; color = s.color; border = `1px solid ${s.color}50` }
                return (
                  <button key={globalIdx} onClick={() => setCurrent(globalIdx)}
                    style={{ background: bg, color, border, borderRadius: 5, padding: "5px 2px", fontSize: "0.65rem", fontWeight: 700, cursor: "pointer" }}
                  >{idx + 1}</button>
                )
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { label: "Soal aktif", bg: "#3b82f6", color: "#3b82f6" },
            { label: "Sudah dijawab", bg: "#3b82f620", color: "#3b82f6" },
            { label: "Ragu-ragu", bg: "rgba(234,179,8,0.15)", color: "#ca8a04" },
            { label: "Belum dijawab", bg: "#f1f5f9", color: "#94a3b8" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: item.bg, border: `1px solid ${item.color}40`, flexShrink: 0 }} />
              <span style={{ fontSize: "0.65rem", color: "#64748b" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    <style>{`
      @media (max-width: 768px) {
        .exam-wrap { flex-direction: column !important; height: auto !important; overflow: visible !important; min-height: 100vh; }
        .exam-question { overflow-y: visible !important; height: auto !important; }
        .exam-sidebar { width: 100% !important; border-left: none !important; border-top: 1px solid #e2e8f0 !important; }
      }
    `}</style>
    </div>
  )
}
