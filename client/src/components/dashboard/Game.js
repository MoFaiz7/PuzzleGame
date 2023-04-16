import React, { useEffect, useState } from 'react'
import "./Game.css";
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import axios from "axios";
import { Link } from "react-router-dom";



const Game = ({ user }) => {
    const [gameinfo, setGameinfo] = useState({
        min: 0,
        sec: 0,
        movesTaken: 0
    })


    useEffect(() => {


        $(document).ready(function () {
            const fetch = async () => {
                try {
                    // console.log(typeof (username.userName));
                    const res = await axios({
                        method: 'post',
                        url: '/api/users/getUserInfo',
                        data: {
                            user: user
                        }
                    });
                    console.log(res.data);

                    var box = $(".box"),
                        orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                        temp = orginal,
                        x = [],
                        date1, date2,
                        moves = 0,
                        mm = 0,
                        ss = 0,
                        upIMG,
                        images = [res.data],
                        img = 0;



                    $('.me').css({ "background-image": 'url(' + images[0] + ')' });

                    $(".start").click(function () {
                        $(".start").addClass('prevent_click');
                        $(".start").delay(100).slideUp(500);
                        $(".full").hide();
                        $(".pre_img").addClass("prevent_click");

                        date1 = new Date();
                        Start();
                        return 0;
                    });

                    function Start() {
                        randomTile();
                        changeBG(img);
                        var count = 0,
                            a,
                            b;
                        $(".me").click(function () {
                            count++;
                            if (count === 1) {
                                a = $(this).attr("data-bid");
                                $('.me_' + a).css({ "opacity": ".65" });
                            } else {
                                b = $(this).attr("data-bid");
                                $('.me_' + a).css({ "opacity": "1" });
                                if (a === b) {
                                } else {
                                    $(".me_" + a)
                                        .addClass("me_" + b)
                                        .removeClass("me_" + a);
                                    $(this)
                                        .addClass("me_" + a)
                                        .removeClass("me_" + b);
                                    $(".me_" + a).attr("data-bid", a);
                                    $(".me_" + b).attr("data-bid", b);
                                }
                                moves++;
                                swapping(a, b);
                                checkCorrect(a);
                                checkCorrect(b);
                                a = b = count = 0;
                            }
                            if (arraysEqual(x)) {
                                date2 = new Date();
                                timeDifferece();
                                showScore();
                                return 0;
                            }
                        });
                        return 0;
                    }

                    function randomTile() {
                        var i;
                        for (i = orginal.length - 1; i >= 0; i--) {
                            var flag = getRandom(0, i);
                            x[i] = temp[flag];
                            temp[flag] = temp[i];
                            temp[i] = x[i];
                        }
                        for (i = 0; i < orginal.length; i++) {
                            box.append(
                                '<div  class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>'
                            );
                            if ((i + 1) % 6 === 0) box.append("<br>");
                        }
                        i = 17;
                        return 0;
                    }

                    function arraysEqual(arr) {
                        var i;
                        for (i = orginal.length - 1; i >= 0; i--) {
                            if (arr[i] !== i) return false;
                        }
                        return true;
                    }

                    function checkCorrect(N1) {
                        var pos = x.indexOf(parseInt(N1, 10));
                        if (pos !== N1) {
                            return;
                        }
                        $(".me_" + N1).addClass("correct , prevent_click ");
                        return;
                    }

                    function swapping(N1, N2) {
                        var first = x.indexOf(parseInt(N1, 10)),
                            second = x.indexOf(parseInt(N2, 10));
                        x[first] = parseInt(N2, 10);
                        x[second] = parseInt(N1, 10);
                        return 0;
                    }

                    function getRandom(min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    const timeDifferece = async () => {
                        var diff = date2 - date1;
                        var msec = diff;
                        var real = msec/1000;
                        var hh = Math.floor(msec / 1000 / 60 / 60);
                        msec -= hh * 1000 * 60 * 60;
                        mm = Math.floor(msec / 1000 / 60); // Gives Minute
                        msec -= mm * 1000 * 60;
                        ss = Math.floor(msec / 1000);		// Gives Second
                        msec -= ss * 1000;

                        const result = await axios({
                            method: 'put',
                            url: '/api/users/levelCleared',
                            data: {
                                user: user,
                                time: real
                            }
                        });
                        console.log(result.data);
                        

                        return 0;
                    }


                    function changeBG(img) {
                        if (img !== 3) {
                            $('.me').css({
                                "background-image": "url(" + images[img] + ")"
                            });
                            return
                        }
                        else
                            $('.me').css({ "background-image": "url(" + upIMG + ")" });
                    }

                    function showScore() {
                        $('#min').html(mm);
                        $('#sec').html(ss);
                        $('#moves').html(moves);

                        setGameinfo({
                            min: mm,
                            sec: ss,
                            movesTaken: moves
                        });



                        setTimeout(function () {
                            $('.cover').slideDown(350);
                        }, 1050);

                        return 0;
                    }

                    $('.OK').click(function () {
                        $('.cover').slideUp(350);
                        window.location.reload(true);
                    });

                    $('.reset').click(function () {
                        $(".tile").remove();
                        $("br").remove();
                        $(".full").show();
                        $(".start").show();
                        $(".pre_img, .start").removeClass("prevent_click");

                        temp = orginal;
                        x = [];
                        moves = ss = mm = 0;
                        return 0;
                    });
                } catch (error) {
                    console.log(error);
                }

            }

            fetch();
        });

        return () => console.log("Cleanup..");
    }, []);
    return (
        <div>

            {/* <!-- partial:index.partial.html --> */}
            <div id="container">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
                <a href="#" class="button start">Start</a>
                <div class="box">
                    <div class="me full"></div>
                </div>
                <div align="center"><a href="#" class="reset" align="center">Reset</a></div>
            </div>

            <div class="cover" >
                <div class="score">
                    <p id="scr_head"> Puzzel Solved...</p>
                    <p id="scr_time"> Time : <span id="min">00</span> Min <span id="sec">00</span> Sec</p>
                    <p id="scr_moves"> Moves : <span id="moves"></span></p>
                    <div class="button OK">OK</div>
                </div>
            </div>
            {/* <!-- partial --> */}
            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script><script src="./script.js"></script>


        </div>
    )
}

export default Game