const OPEN_HOUR = 9;
const CLOSE_HOUR = 17;

// Open Monday to Friday, from 9:00 up to (not including) 17:00.
// `now` is injectable for testing; set FAKE_TIME (ISO date) to simulate a request time.
function isWorkingTime(now = new Date()) {
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  return day >= 1 && day <= 5 && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

function workingHours(req, res, next) {
  const now = process.env.FAKE_TIME ? new Date(process.env.FAKE_TIME) : new Date();
  if (isWorkingTime(now)) return next();
  res.status(503).render('closed', { title: 'Closed', page: '' });
}

module.exports = { workingHours, isWorkingTime };
