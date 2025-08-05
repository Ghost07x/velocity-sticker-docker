const express = require('express');
const app = express();
const { exec } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/stickers', express.static(path.join(__dirname, 'stickers')));

app.get('/windowsticker', (req, res) => {
  const vin = req.query.vin;
  if (!vin) return res.status(400).send("VIN required");

  console.log(`📥 Request for VIN: ${vin}`);
  const command = `VIN=${vin} node velocityStickerBot.js`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${stderr}`);
      return res.status(500).send("Screenshot failed");
    }
    console.log(`✅ Screenshot saved for ${vin}`);
    res.json({
      success: true,
      vin,
      image: `/stickers/window_sticker_${vin}.png`
    });
  });
});

app.listen(PORT, () => {
  console.log(`🖥️ Server running on port ${PORT}`);
});