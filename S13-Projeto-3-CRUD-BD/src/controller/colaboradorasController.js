const Colaboradoras = require('../models/colaboradorasModel')
const bcrypt = require('bcrypt')
const colaboradoras = require('../models/colaboradorasModel')
const SECRET = process.env.SECRET

const create = (req, res) =>{
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
    req.body.senha = senhaComHash
    const colaboradora = new Colaboradoras (req.body)

    
    //{nomme: 'narlene', email: 'narlenes092@gmail.com', sena: 'sabia987'}

    colaboradora.save(function (err) {
        if (err) {
            res.status(500).send({messege: err.messege})
        }
     

        res.status(201).send(colaboradora)
    })
 
}

const getAll = (req, res) => {
    Colaboradoras.find(function (err, coachRoutes){
        if (err) {
            res.status(500).send({ messege: err.messege})
        }

        res.status(201).send(colaboradoras)
    })
}

const deleteById = async(req, res) => {
    try {
   const{ id } = req.params
   await Colaboradoras.findByIdAndDelete[id]
   const messege = `A colaboradora com id ${id} foi deletado com sucesso!`
   res.status(200).json({messege})
   }    catch {error} {
        console.error(error)
        console.status(500).json({ messege: error.messege})
      }
}


 //req.body.email
//reqbody.senha
const login = (req, res) => {
    Colaboradoras.findOne({email: req.body.email}, function (error, colaboradora) {
        if (error) {
            return res.status(500).send ({ messege: 'deu ruim'})
        }
        if (!colaboradora) {
            return res.status(404).send("não existe colaboradora com este email!")
        }

        const senhaValida = bcrypt.compareSync(req.body.senha, colaboradora.senha)

        if (!senhaValida) {
            return res.status(403).send("que senha é essa?")
        }
         
        const token = jwt.sign({ email: req.body.email}, SECRET)
        return res.status(200).send(token)

    })
}
const findAllCoaches = async (req, res) => {
    try {
      const authHeader = req.get('authorization')
  
      if(!authHeader) {
        return res.status(401).json({ message: "cadê o auth???"})
      }
      const token = authHeader.split(" ")[1]
      await jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
          return res.status(403).send("não rolou")
        }
        
      const allCoaches = await CoachModel.find()
      res.status(200).json(allCoaches)
      })
  
    } catch(error) {
      console.error(error)
      res.status(500).json({ message: error.message})
    }
  }
  
module.exports = {
    create,
    getAll,
    deleteById,
    login,
    findAllCoaches 
}
