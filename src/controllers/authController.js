require("dotenv").config();
const Users = require("../models/User");

const puppeteer = require("puppeteer");

const createScreenshot = async (username) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 500, height: 450 });
    await page.goto(`https://twitter.com/${username}`);

    let div_selector_to_remove = ".css-1dbjc4n.r-l5o3uw.r-1upvrn0";

    await page.waitForTimeout(4000)

    await page.evaluate((sel) => {
      var elements = document.querySelectorAll(sel);
      for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }, div_selector_to_remove);


    const imgName = `twitter-${Date.now()}.png`;

    await page.screenshot({ path: `${__dirname}/../public/images/${imgName}` });
    await browser.close();

    return imgName;
  } catch (err) {
    console.log(err);
  }
};

class AuthController {

  async login(req, res) {
    const { username } = req.query;

    const candidate = await Users.findOne({ username });

    console.log('start creating user')

    if (!candidate) {
      const img = await createScreenshot(username);

      const user = new Users({ username, image: img });

      user.save(user);

      res.json(user);

      return
    }

    res.json(candidate);
  }

}

module.exports = new AuthController();
