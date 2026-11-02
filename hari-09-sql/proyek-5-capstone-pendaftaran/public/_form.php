<form method="post">
    <input type="hidden" name="csrf" value="<?= e(tokenCsrf()) ?>">
    <p>
        <label for="nama">Nama</label><br>
        <input id="nama" name="nama" value="<?= e((string) ($lama['nama'] ?? '')) ?>" required>
        <?php if (isset($galat['nama'])): ?><span class="error"><?= e($galat['nama']) ?></span><?php endif; ?>
    </p>
    <p>
        <label for="email">Email</label><br>
        <input id="email" name="email" type="email" value="<?= e((string) ($lama['email'] ?? '')) ?>" required>
        <?php if (isset($galat['email'])): ?><span class="error"><?= e($galat['email']) ?></span><?php endif; ?>
    </p>
    <p>
        <label for="no_hp">No. HP</label><br>
        <input id="no_hp" name="no_hp" value="<?= e((string) ($lama['no_hp'] ?? '')) ?>" required>
        <?php if (isset($galat['no_hp'])): ?><span class="error"><?= e($galat['no_hp']) ?></span><?php endif; ?>
    </p>
    <p>
        <label for="kelas_id">Kelas</label><br>
        <select id="kelas_id" name="kelas_id" required>
            <option value="">-- Pilih kelas --</option>
            <?php foreach ($kelas as $k): ?>
                <option value="<?= (int) $k['id'] ?>" <?= (int) ($lama['kelas_id'] ?? 0) === (int) $k['id'] ? 'selected' : '' ?>><?= e($k['nama_kelas']) ?></option>
            <?php endforeach; ?>
        </select>
        <?php if (isset($galat['kelas_id'])): ?><span class="error"><?= e($galat['kelas_id']) ?></span><?php endif; ?>
    </p>
    <p>
        <label for="alamat">Alamat</label><br>
        <textarea id="alamat" name="alamat" rows="3"><?= e((string) ($lama['alamat'] ?? '')) ?></textarea>
    </p>
    <button type="submit">Simpan</button>
    <a href="index.php">Batal</a>
</form>
