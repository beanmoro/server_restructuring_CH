

const getAllProducts = async(req, res)=>{
    try {
        const { limit, page, sort, category, status} = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1
            },
            lean: true
        };

        if(status){
            const products = await productDao.getAll({status: status}, options);
            return res.status(200).json({ products });
        }

        if(category){
            const products = await productDao.getAll({ category: category }, options);
            return res.status(200).json({ products });
        }

        const produtcs = await productDao.getAll({}, options);

        res.status(200).json({ status: "success", produtcs});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
}

const getProduct = async (req, res)=>{
    try {
        const { pid } = req.params;

        const product = await productDao.getById(pid);
        if(!product){
            return res.status(404).json({ status: "Error", msg: `Producto con la id ${pid} no encontrado.`});
        }

        res.status(200).json({status: "success", payload: product});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", })
    }
}


const createProduct = async (req, res) =>{
    try {
        const product = req.body;
        const newProduct = await productDao.create(product);

        res.status(201).json({status: "success", payload: newProduct});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor"})
    }
}

const updateProduct = async(req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;

        const updateProduct = await productDao.update(pid, productData);
        if(!updateProduct){
            return res.status(404).json({
                status: "Error",
                msg: `Producto con el id ${pid} no encontrado!`
            });
        }

        res.status(500).json({status: "success", payload: updateProduct});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor."});
    }
}

const removeProduct = async(req, res) => {
    try {
        const { pid } = req.params;
        const product = await productDao.deleteOne(pid);

        if(!product){
            return res.status(404).json({status: "Error", msg: `Producto con el id ${pid} no encontrado.`});
        }

        res.status(200).json({status: "success", msg: `Producton con el id ${pid} no encontrado.`})
    } catch (error) {
        console.error(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor."});
    }
}

export default {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    removeProduct
}