const express = require("express");

const db = require("./db");

const app = express();


// Middleware to accept JSON
app.use(express.json());



// Home API

app.get("/", function(request, response){

    response.send("Welcome to User API");

});


// Get all users from MySQL

app.get("/users", function(request,response){


    const sql = "SELECT * FROM users";


    db.query(sql, function(error,result){


        if(error){

            response.status(500).json({

                message:"Database error"

            });

        }


        else{

            response.json(result);

        }


    });


});






// Get single user from MySQL

app.get("/users/:id", function(request,response){


    const userId = request.params.id;


    const sql = "SELECT * FROM users WHERE id = ?";


    db.query(sql,[userId],function(error,result){


        if(error){


            response.status(500).json({

                message:"Database error"

            });


        }


        else{


            if(result.length === 0){


                response.status(404).json({

                    message:"User not found"

                });


            }


            else{


                response.json(result[0]);


            }


        }


    });


});


// Update user in MySQL

app.put("/users/:id", function(request,response){


    const userId = request.params.id;

    const name = request.body.name;

    const email = request.body.email;


    const sql = 
    "UPDATE users SET name=?, email=? WHERE id=?";


    db.query(
        sql,
        [name,email,userId],
        function(error,result){


            if(error){


                response.status(500).json({

                    message:"Database error"

                });


            }


            else{


                if(result.affectedRows === 0){


                    response.status(404).json({

                        message:"User not found"

                    });


                }


                else{


                    response.json({

                        message:"User updated successfully"

                    });


                }


            }


        }
    );


});

// Create user in MySQL

app.post("/users", function(request,response){


    const name = request.body.name;

    const email = request.body.email;


    const sql = "INSERT INTO users(name,email) VALUES (?,?)";


    db.query(sql,[name,email],function(error,result){


        if(error){

            response.status(500).json({

                message:"Database error"

            });

        }


        else{


            response.status(201).json({

                message:"User created successfully",

                userId: result.insertId

            });


        }


    });


});


// Delete user from MySQL

app.delete("/users/:id", function(request,response){


    const userId = request.params.id;


    const sql = "DELETE FROM users WHERE id=?";


    db.query(
        sql,
        [userId],
        function(error,result){


            if(error){


                response.status(500).json({

                    message:"Database error"

                });


            }


            else{


                if(result.affectedRows === 0){


                    response.status(404).json({

                        message:"User not found"

                    });


                }


                else{


                    response.json({

                        message:"User deleted successfully"

                    });


                }


            }


        }
    );


});




// API VERSION 1

app.get("/api/v1/users/:id", function(request,response){


    const userId = request.params.id;


    const sql = "SELECT id,name,email FROM users WHERE id=?";


    db.query(sql,[userId],function(error,result){


        if(error){

            response.status(500).json({

                message:"Database error"

            });

        }


        else{


            if(result.length === 0){

                response.status(404).json({

                    message:"User not found"

                });

            }


            else{

                response.json(result[0]);

            }


        }


    });


}); 



// API VERSION 2

app.get("/api/v2/users/:id", function(request,response){


    const userId = request.params.id;


    const sql = "SELECT id,name,email FROM users WHERE id=?";


    db.query(sql,[userId],function(error,result){


        if(error){


            response.status(500).json({

                message:"Database error"

            });


        }


        else{


            if(result.length === 0){


                response.status(404).json({

                    message:"User not found"


                });


            }


            else{


                const user = result[0];


                response.json({

                    id:user.id,

                    name:user.name,

                    email:user.email,

                    apiVersion:"v2",

                    message:"Enhanced user details"


                });


            }


        }


    });


});




// Create Order API

app.post("/orders", function(request,response){


    const customerName = request.body.customerName;
    const productName = request.body.productName;
    const amount = request.body.amount;


    if(!customerName || !productName || !amount){


        return response.status(400).json({

            message:"Required fields missing"

        });


    }


    const sql =
    "INSERT INTO orders(customerName, productName, amount, status) VALUES (?,?,?,?)";


    db.query(
        sql,
        [customerName, productName, amount, "CREATED"],
        function(error,result){


            if(error){


                response.status(500).json({

                    message:"Database error"

                });


            }


            else{


                response.status(201).json({

                    message:"Order created successfully",

                    orderId: result.insertId

                });


            }


        }
    );


});





// Get All Orders

app.get("/orders", function(request,response){


    const sql = "SELECT * FROM orders";


    db.query(sql,function(error,result){


        if(error){


            response.status(500).json({

                message:"Database error"

            });


        }

        else{


            response.json(result);


        }


    });


});



// Get Order By ID

app.get("/orders/:id", function(request,response){


    const orderId = request.params.id;


    const sql = "SELECT * FROM orders WHERE id=?";


    db.query(sql,[orderId],function(error,result){


        if(error){


            response.status(500).json({

                message:"Database error"

            });


        }


        else{


            if(result.length === 0){


                response.status(404).json({

                    message:"Order not found"

                });


            }

            else{


                response.json(result[0]);


            }


        }


    });


});



// Update Order Status

app.put("/orders/:id/status", function(request,response){


    const orderId = request.params.id;

    const status = request.body.status;


    const sql =
    "UPDATE orders SET status=? WHERE id=?";


    db.query(sql,[status,orderId],function(error,result){


        if(error){


            response.status(500).json({

                message:"Database error"

            });


        }


        else{


            if(result.affectedRows === 0){


                response.status(404).json({

                    message:"Order not found"

                });


            }

            else{


                response.json({

                    message:"Order status updated successfully"

                });


            }


        }


    });


});


// Delete Order

app.delete("/orders/:id", function(request,response){


    const orderId = request.params.id;


    const sql =
    "DELETE FROM orders WHERE id=?";


    db.query(sql,[orderId],function(error,result){


        if(error){


            response.status(500).json({

                message:"Database error"

            });


        }


        else{


            if(result.affectedRows === 0){


                response.status(404).json({

                    message:"Order not found"

                });


            }

            else{


                response.json({

                    message:"Order deleted successfully"

                });


            }


        }


    });


});










































// Start Server

app.listen(3000, function(){

    console.log("Server started on port 3000");

});