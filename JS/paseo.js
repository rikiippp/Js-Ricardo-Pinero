alert(`Bienvenido a "El Amuleto Perdido"`);

let ingreso = prompt(`¿Deseas entrar a esta aventura? si/no`).toLowerCase();

while (ingreso === `si`) {

    //Introducción 
    alert(`Estupendo!! sigamos adelante.`);

    //Preguntamos nombre y presentamos
    let nombre = prompt(`¿Como quieres llamarte?`);

    alert(`Hola ${nombre}!!, Eres un arqueólogo en busca de un amuleto legendario. Llegaste a una antigua cámara.`);

    // Primera elección
    let eleccion = parseInt(prompt(`¿Qué deseas hacer?
    1. Exploras la cámara con cuidado.
    2. Decides investigar por afuera.
    3. Te arrepentiste y vuelves a casa.`));

    // Entramos a la cámara
    if (eleccion == 1) {
        let decision = parseInt(prompt(`Entras a la cámara. A medida que inspeccionas las paredes adornadas con jeroglíficos, notas una extraña palanca camuflada.
            1. Accionas la palanca.
            2. Decides ignorarla y seguir explorando.`));

        // Encontramos el tesoro
        if (decision == 1) {
            alert(`Accionas la palanca y, de repente, el suelo comienza a temblar, revelando una entrada secreta hacia un pasaje subterráneo. Con valentía, decides adentrarte en la oscuridad, logras ver un altar repleto de joyas.`);

            let tesoro = prompt(`¿Qué quieres hacer? (agarrar/dejar)`).toLowerCase();

            // Desafíos para el tesoro
            if (tesoro === `agarrar`) {
                for (let acertijo = 1; acertijo <= 4; acertijo++) {
                    let respuesta = prompt(`Acertijo ${acertijo}: para completarlo debes de girar la manivela. (girar/volver)`).toLowerCase();

                    if (respuesta === `girar`) {
                        alert(`Felicidades has completado el acertijo ${acertijo}.`);

                        if (acertijo === 4) {
                            alert(`Has completado todos los acertijos, lograste agarrar las joyas. ¡Te hiciste millonario!!`);
                        }
                    } else if (respuesta === `volver`) {
                        alert(`Decides volver y abandonar tu investigación.`);
                        break; // Salimos del loop
                    } else {
                        // Respuesta no valida
                        alert(`Respuesta no válida, por favor, ingresa "girar" o "volver".`);
                        acertijo--; // Restamos 1 al contador para repetir el mismo acertijo
                    }
                }
            } else if (tesoro === `dejar`) {
                // Decision dejar el tesoro
                alert(`Dejas el tesoro en su lugar para que otros investigadores lo encuentren, te marchas..`);
            } else {
                alert(`Por favor, ingresa "agarrar" o "dejar".`);
            }
        } else if (decision == 2) {
            // Decision dejar la palanca y salir de la cámara
            alert(`Elegiste ignorar la palanca y volver hacia el exterior. ¡Espero que te vaya genial!`);
        }else {
            // Respuesta no valida
            alert(`Por favor, ingresa una respuesta valida. (1/2)`);
        }
    } else if (eleccion == 2) {
        // Segunda elección

        function afuera (){
            // Función extraterrestre
            let extraterrestre = false
            while (!extraterrestre) {
                alert(`Mientras investigas por afuera, te encontrás algo reluciente en el suelo...`);
                let objeto = prompt(`¿Quieres ir a verlo o volver a casa? (ir/volver)`).toLowerCase();
                if (objeto === `ir`){
                    alert(`Te agachas para agarrarlo, cuando subís la mirada... ¡¡PAAMMM!!. Un ovni te rapto y te llevaron como experimento.
                    DESPIERTA ${nombre}!! VUELVE A ELEGIR.`);
                    console.log(`ha sido raptado`);
                } 
                if (objeto === `volver`) {
                    // Volvemos a casa
                    alert(`Ya has tenido muchas pesadillas... vuelves a casa para descansar.`);
                    console.log(`todo ha sido una pesadilla.. `)
                    extraterrestre = true
                } else {
                    alert(`Asegúrate de ingresar una respuesta valida.`);
                }
                }
            }
        afuera();

        } else if (eleccion == 3){
            alert(`Lamento que te hayas arrepentido, espero que vuelvas pronto por mas aventuras...`);
        } else {
            // Respuesta no valida
            alert(`Por favor, ingresa una respuesta valida. (1/2/3)`);
        }
        
        // Despedida
        alert(`Gracias por haber jugado!`);
        
        // Preguntamos si desea volver a jugar
        ingreso = prompt(`Deseas aventurarte nuevamente? (si/no)`).toLowerCase();
    } 







