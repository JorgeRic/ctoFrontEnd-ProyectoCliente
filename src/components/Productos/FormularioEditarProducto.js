import React, { Component } from 'react'
import { ACTUALIZAR_PRODUCTO } from '../../mutations'
import { Mutation } from 'react-apollo'
//Para redireccionar la pagina
import { withRouter } from 'react-router-dom'

const inicialState={
  nombre: '',
  precio: '',
  stock: ''
}
class FormularioEditarProducto extends Component {
  state={
    ...this.props.producto.getProducto
  }
  limpiarState = () => {
    this.setState({
      ...inicialState
    })
  }

  actualizarState = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  validarForm= () =>{
    const { nombre, precio, stock } = this.state;
    const noValido = !nombre || !precio || !stock
    return noValido;
  }

  editarProductoForm = (e, actualizarProducto) => {
    e.preventDefault()
    actualizarProducto().then(data => {
      this.setState({
        ...inicialState
      })   
    })
  }

  render() {
    const { nombre, precio, stock } = this.state
    const {id} = this.props
    const input = {
      id,
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    }
    
    return (
      
        <Mutation 
          mutation={ACTUALIZAR_PRODUCTO}
          variables={{input}}
          key={id}
          onCompleted={ () => this.props.refetch().then(() =>{
            this.props.history.push('/productos')
            })
          }
        >
        {( actualizarProducto,{loading, error, data})=> {
          return(

          <form 
            className="col-md-8" 
            onSubmit={e => this.editarProductoForm(e, actualizarProducto)}
          >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        onChange={this.actualizarState}
                        type="text"
                        name="nombre" 
                        className="form-control" 
                        placeholder="Nombre del Producto"
                        value={nombre}
                    />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input 
                            onChange={this.actualizarState}
                            type="number" 
                            name="precio" 
                            className="form-control" 
                            placeholder="Precio del Producto"
                            value={precio}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input 
                        onChange={this.actualizarState}
                        type="number" 
                        name="stock" 
                        className="form-control" 
                        placeholder="stock del Producto" 
                        value={stock}
                    />
                </div>
                <button 
                    disabled={ this.validarForm() }
                    type="submit" 
                    className="btn btn-success float-right">
                            Guardar Cambios
                </button>
          </form>
          )
        }}
        </Mutation>
      
    )
  }
}
//Redireccionamos
export default withRouter( FormularioEditarProducto );
