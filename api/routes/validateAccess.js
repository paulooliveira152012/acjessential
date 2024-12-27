// export default function handler(req, res) {
//     console.log("backedn to check IP reached")
//     const allowedIP = '174.166.193.196'; // Replace with the specific IP
//     const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
//     if (clientIP === allowedIP) {
//       return res.status(200).json({ access: true });
//     } else {
//       return res.status(403).json({ access: false });
//     }
//   }
  