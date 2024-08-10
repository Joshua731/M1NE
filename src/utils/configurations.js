import paramoreMusic from "../music/frenetica.mp3";
import paramore from "../imgs/paramore-album.jpg";
import periclesMusic from "../music/pericles-ate-que-durou.mp3";
import periclesCapa from "../imgs/ate-que-durou-capa.jpg";
import maybeLoveMusic from "../music/love-maybe.mp3";
import maybeLoveCapa from "../imgs/love-maybe-capa.jpg";
import heartAttackMusic from "../music/heart-attack-demi-lovato.mp3";
import heartAttackCapa from "../imgs/heart-attack-demi-lovato-capa.jpg";
import campoMinadoMusic from "../music/campominado.mp3";
import campoMinadoCapa from "../imgs/campo_minado.png";
import judasMusic from "../music/lady-gaga-judas.mp3";
import judasCapa from "../imgs/lady-gaga-judas-capa.jpg";
import IsabellaLullabyMusic from "../music/Isabellas-Lullaby-Melody.mp3";
import IsabellaLullabyCapa from "../imgs/Isabella-lullaby-capa.png";

const ROUTE_SERVER = "http://localhost:3001";

const tracks = [
    {title: "Campo Minado - Trilha Sonora", src:campoMinadoMusic, img:campoMinadoCapa },
    { title: "Misery Business - Paramore", src: paramoreMusic, img:paramore },
    { title: "Até que durou - Péricles", src:periclesMusic, img: periclesCapa },
    { title: "Love, Maybe - MeloMance", src:maybeLoveMusic, img: maybeLoveCapa },
    { title: "Heart Attack - Demi Lovato", src:heartAttackMusic, img: heartAttackCapa },
    { title: "Judas - Lady Gaga", src:judasMusic, img: judasCapa },
    { title: "Isabella Lullaby - The Promised Neverland", src:IsabellaLullabyMusic, img: IsabellaLullabyCapa },
];

export {
    ROUTE_SERVER,
    tracks
}