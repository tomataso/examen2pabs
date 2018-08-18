PasswordGenerate

Install
$ npm install generate-password --save

Usage
generate([options])
Generate one password with the given options. Returns a string.

var generator = require('generate-password');
 
var password = generator.generate({
    length: 10,
    numbers: true
});
 
// 'uEyMTw32v9'
console.log(password);
generateMultiple(amount[, options])
Bulk generate multiple passwords at once, with the same options for all. Returns an array.

var generator = require('generate-password');
 
var passwords = generator.generateMultiple(3, {
    length: 10,
    uppercase: false
});
 
// [ 'hnwulsekqn', 'qlioullgew', 'kosxwabgjv' ]
console.log(passwords);




*****************************************************************************
-----------------------------------------------------------------------------
*****************************************************************************


Por razones de seguridad creamos usuarios y les enviamos una contraseña generada temporalmente. En su primer inicio de sesión, el usuario debe cambiar su contraseña antes de seguir navegando por las páginas protegidas.

Estoy usando un sitio web express / node ejecutando un módulo local de pasaporte. Registrarse, iniciar sesión en usuarios todo el trabajo. Pero estoy perdido en las mejores prácticas para que los usuarios cambien su contraseña en el primer inicio de sesión.

Mi idea era hacer lo siguiente:

/* POST login page. */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/dashboard/users',
    failureRedirect: 'pages/login'}, function(err, user, info) {
    if(err) {
      console.log('')
      return res.render('pages/login', {title: 'Login', error: err.message});
    }

    if(!user) {
      return res.render('pages/login', {title: 'Login', error: info.message});
    }
    return req.logIn(user, function(err) {
      if(err) {
        return res.render('pages/login', {title: 'Login', error: err.message});
      } else if (user.firstLogin) {
        return res.redirect('/change-password'); // <- First login
      } else {
        return res.redirect('/dashboard/users');
      }
    });
  })(req, res, next);
}); 


Como puede ver, tengo un valor booleano simple (tinyInt 0-1) en mi base de datos (por defecto es 1). Después, estableceré un método de publicación que después de un cambio exitoso, el valor booleano se establecerá en 0.

¿Es esta una forma correcta ('a' no 'la': p)? ¿Qué tal la seguridad?

Respuesta ***********************

Definitivamente es una forma correcta. Yo diría que se adapta perfectamente a tus necesidades. Personalmente me gusta cómo el uso de su campo de base de datos refleja directamente la lógica de negocio detrás de él.

Las alternativas, aunque soy fan de su solución, podrían ser:

1

Agregar un campo de fecha lastLogin a su base de datos que por defecto es NULL. Esto almacenaría un sello de fecha y hora siempre que el usuario inicie sesión. Podría usarlo como una verificación implícita si el usuario alguna vez ha iniciado sesión anteriormente. Personalmente prefiero tener columnas explícitas para sus propósitos (como lo hace con su primera columna de registro) porque el propósito de la columna y la lógica comercial de la aplicación es muy claro.

2

Otra alternativa sería almacenar cuando un usuario haya actualizado su contraseña por última vez, es decir, lastPasswordChange al valor NULL predeterminado para usuarios nuevos. Mismo razonamiento que el anterior. Podría ser útil si desea que sus usuarios cambien sus contraseñas cada n días.

Seguridad hablando, diría que esto sería sólido. Siempre que su primer campo de registro predeterminado sea 1, no habría manera de que un nuevo usuario pudiera saltear el cambio de contraseña al primer inicio de sesión.

Sin embargo, cuando un usuario actualice su contraseña, asegúrese de actualizar el primer campo de registro en la misma consulta o realizar ambas consultas dentro de una transacción. De esta forma, siempre estará seguro de que se cambian tanto la contraseña como el primer campo de registro. Si por alguna razón cualquiera de las consultas fallara, tendría un usuario que ya cambió su contraseña y se le pide / obliga a cambiarla nuevamente o a un usuario que tiene una contraseña generada aleatoriamente sin que se le solicite que la cambie. Si lo hace dentro de la misma consulta, se aseguraría de que ambos, o ninguno, se actualice al mismo tiempo. Hacerlo dentro de una transacción te deja con la opción de suspender / revertir la transacción cuando falla cualquiera de las consultas.

En otra nota, tu código podría escribirse así (tanto a tu manera como a la correcta, solo es cuestión de preferencia y visual):


/* POST login page. */
router.post('/login', function(req, res, next) {
    passport.authenticate('local', { 
        successRedirect: '/dashboard/users',
        failureRedirect: 'pages/login'
    }, function(err, user, info) {
        if(err) {
            console.log('')
            return res.render('pages/login', {title: 'Login', error: err.message});
        }

        if(!user) {
            return res.render('pages/login', {title: 'Login', error: info.message});
        }
        return req.logIn(user, function(err) {
            if(err) {
                return res.render('pages/login', {title: 'Login', error: err.message});
            } 

            // Using if/else if/else makes no difference since if the first if is executed
            // in both cases nothing else will execute due to if/else or the return.
            // In case the above statement resolves to `false` the effect wills till be the same

            if (user.firstLogin) { 
                return res.redirect('/change-password'); // <- First login
            }
            // The else is not necessary due to the return in the line above.
            return res.redirect('/dashboard/users');
        });
    })(req, res, next);
});

