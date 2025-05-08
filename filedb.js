watundb> db.mahasiswa.insertOne({
     nim_mhs : "D0222305",
    nama_mhs : "Watun",
    jns_kelamin_mhs : "Wanita",
    status_mhs : true
})

watundb> db.mahasiswa.find()
[
  {
    _id: ObjectId('681cdcd3ce5258e7d66c4bd0'),
    nim_mhs: 'D0222305',
    nama_mhs: 'Watun',
    jns_kelamin_mhs: 'Wanita',
    status_mhs: true
  }
]
