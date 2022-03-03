const express = require("express")
const app = express()
const PORT = 8000

let routes = [
    {prefix: `/user`, route: require(`./routes/user`)},
    {prefix: `/buku`, route: require(`./routes/buku`)},
    {prefix: `/pinjam`, route: require(`./routes/pinjam`)}
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)
}

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})