const express = require('express')
const routers = express.Router()
const client = require('./connection')
const ObjectId = require('mongodb').ObjectId

routers.get('/products', async (req, res) => {
  if(client.isConnected()){
    const db = client.db('latihan')
    const products = await db.collection('products').find().toArray()
    res.send({
      status: 'success',
      message: 'list products',
      data: products
    })
  }else{
    res.send({
      status: 'error',
      message: 'koneksi database gagal'
    })
  }
})

routers.get('/product/:id', async (req, res) => {
  if(client.isConnected()){
    const db = client.db('latihan')
    const id = req.params.id
    const _id = (ObjectId.isValid(id)) ? ObjectId(id) : id
    const product = await db.collection('products').findOne({
      _id: _id
    })
    res.send({
      status: 'success',
      message: 'single product',
      data: product
    })
  }else{
    res.send({
      status: 'error',
      message: 'koneksi database gagal'
    })
  }
})

routers.post('/product', async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body
    const db = client.db('latihan')

    const result = await db.collection('products').insertOne({
      name: name,
      price: price,
      stock: stock,
      status: status
    })
    if(result.insertedCount == 1){
      res.send({
        status: 'success',
        message: 'tambah product success'
      })
    }else{
      res.send({
        status: 'warning',
        message: 'tambah product gagal',
      })
    }
  } else {
    res.send({
      status: 'error',
      message: 'koneksi database gagal'
    })
  }
})

routers.put('/product/:id', async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body
    const db = client.db('latihan')
    const id = req.params.id
    const _id = (ObjectId.isValid(id)) ? ObjectId(id) : id
    const result = await db.collection('products').updateOne(
      { _id : _id },
      {
        $set: {
          name: name,
          price: price,
          stock: stock,
          status: status
        }
      }
    )
    if(result.matchedCount == 1){
      res.send({
        status: 'success',
        message: 'update product success'
      })
    }else{
      res.send({
        status: 'warning',
        message: 'update product gagal'
      })
    }
  } else {
    res.send({
      status: 'error',
      message: 'koneksi database gagal'
    })
  }
})

routers.delete('/product/:id', async (req, res) => {
  if (client.isConnected()) {
    const db = client.db('latihan')
    const id = req.params.id
    const _id = (ObjectId.isValid(id)) ? ObjectId(id) : id
    const result = await db.collection('products').deleteOne({
      _id: _id 
    })
      
    if (result.deletedCount==1){
      res.send({
        status: 'success',
        message: 'delete product success',
      })
    } else {
      res.send({
        status: 'warning',
        message: 'delete product gagal',
      })
    }
  } else {
    res.send({
      status: 'error',
      message: 'koneksi database gagal'
    })
  }
})

// kode routing lainnya
module.exports = routers