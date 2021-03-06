/**
 * Created by emalsha on 3/9/17.
 */

const spawn = require( 'child_process' ).spawn;
// const cmd = 'aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --rpc-secret=ucscaria';
var Aria2 = require('aria2');
let option = {
    secure: false,
    host: 'localhost',
    port: 6800,
    secret: 'ucscaria',
    path: '/jsonrpc'
};
var aria2 = new Aria2(option);


aria2.onDownloadStart = function (msg) {
    console.log('Download start > GID : ' + msg.gid);
};

aria2.onDownloadComplete = function (msg) {
    console.log('Download completed on > GID :' + msg.gid);
};

// aria2.open().then(function () {
//     console.log('Web socket is open');
// }).then(aria2.addUri(['https://www.w3schools.com/css/trolltunga.jpg'],function (err, res) {
//     console.log(err || res);
// }));

// aria2.open()
//     .then(function () {
//         console.log('Web socket is open');
//     })
//     .then(function () {
//             let ar = ['https://www.w3schools.com/css/trolltunga.jpg', 'https://www.w3schools.com/css/trolltunga.jpg', 'https://www.w3schools.com/css/trolltunga.jpg', 'https://www.w3schools.com/css/trolltunga.jpg'];
//             for (let i = 0; i < ar.length; i++) {
//                 aria2.addUri([ar[i]], function (err, res) {
//                     console.log(err || res);
//                 })
//             }
//         }
//     );

aria2.getVersion(function(err,res){
    if(err){
        // console.log(err);

        ariac = spawn('aria2c',['--enable-rpc', '--rpc-listen-all=true', '--rpc-allow-origin-all' ,'--rpc-secret=ucscaria']);

        ariac.stdout.on( 'data', data => {
            console.log( `stdout: ${data}` );
        });

        ariac.stderr.on( 'data', data => {
            console.log( `stderr: ${data}` );
        });

        ariac.on( 'close', code => {
            console.log( `child process exited with code ${code}` );
        });
    }

    console.log(res);
});