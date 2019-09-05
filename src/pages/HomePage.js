import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchHome } from "../actions";

import HeaderDefault from "../components/HeaderDefault.js";
import FooterDesloged from "../components/FooterDesloged.js";
import Swiper from 'swiper';

import "../assets/js/script.js";

import vantagem_icon_1 from "../assets/imgs/vantagem-icon-1.png";
import vantagem_icon_2 from "../assets/imgs/vantagem-icon-2.png";
import vantagem_icon_3 from "../assets/imgs/vantagem-icon-3.png";
import vantagem_icon_4 from "../assets/imgs/vantagem-icon-4.png";

import "../assets/css/swiper.min.css";


import $ from 'jquery';


class HomePage extends Component {
    
    componentDidMount() {
        this.props.dispatch(fetchHome());

        var swiperCriarFesta = new Swiper('.swiper-container.swiper-criar-festa', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            slideToClickedSlide: true,
            initialSlide: 1,
            slidesOffsetBefore: -270,
            centeredSlides: true,
            roundLengths: true,
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-navigation-criar-festa .swiper-next',
                prevEl: '.swiper-navigation-criar-festa .swiper-prev',
            },
            breakpoints: {
                // when window width is <= 640px
                900: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 0,
                    initialSlide: 0,
                    spaceBetween: 0,
                    centeredSlides: false,
                },
                1024: {
                    slidesPerView: 2,
                    slidesOffsetBefore: 30,
                    initialSlide: 0,
                    spaceBetween: 0,
                    centeredSlides: false,
                }
            }
        });
    }

  render() {
    const { error, loading, home } = this.props;
    const { items } = home;
    const { meta_fields } = items;
    const { steps } = items;
    const { template_attr } = items;
    const { features } = items;
    const { parties } = items;

    

    let subtitle = '';
    let current_parties = [];

    if ( undefined !== meta_fields && items.ID == 2 ) {
        subtitle = meta_fields.subtitle;

        $( '#event_type_description' ).html(meta_fields.event_type_description[0]);
        $( '#template_attributes_description' ).html(meta_fields.template_attributes_description[0]);
        $( '#featured_points_description' ).html(meta_fields.featured_points_description[0]);
    }

    if ( undefined !== steps ) {
        $('.faca-festa .cards .card p').each(function(index, item) {
            $(item).html(items.steps[index].post_content)
        })

        $('.card .icon').each(function(index, item) {
            $(item).html( steps[index].post_excerpt )
        })
    }

    if ( undefined !== template_attr ) {
        $('.cards-options-template .card-option .title').each(function(index, item) {
            $(item).html(template_attr[index].post_title)
        });

        $('.cards-options-template .card-option .desc').each(function(index, item) {
            if ( undefined !== template_attr[index] ) {
                $(item).html(template_attr[index].post_content)
            }
        })
    }

    if ( undefined !== features ) {
        $('.vantagem-info p.title').each(function(index, item) {
            $(item).html(features[index].post_title)
        })
        $('.vantagem-info span').each(function(index, item) {
            $(item).html(features[index].post_content)
        })
    }

    if ( undefined !== parties ) {
        current_parties = parties;
    }

    setTimeout(
        function() {
            var swiperCriarFesta = new Swiper('.swiper-container.swiper-criar-festa', {
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                slideToClickedSlide: true,
                initialSlide: 1,
                slidesOffsetBefore: -270,
                centeredSlides: true,
                roundLengths: true,
                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-navigation-criar-festa .swiper-next',
                    prevEl: '.swiper-navigation-criar-festa .swiper-prev',
                },
                breakpoints: {
                    // when window width is <= 640px
                    900: {
                        slidesPerView: 1,
                        slidesOffsetBefore: 0,
                        initialSlide: 0,
                        spaceBetween: 0,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 30,
                        initialSlide: 0,
                        spaceBetween: 0,
                        centeredSlides: false,
                    }
                }
            });
        },
        1500
    );
    
    return (
      <main className="home">

        <header className="default">
            <div className="container lg">
                <HeaderDefault themeLight homePage />
            </div>
            <div className="container content">
                <div className="flex flex-column header-content">
                    
                    <h2 className="title">{items.post_title}</h2>
                    <p className="subtitle">{subtitle}</p>
                    <button className="gradient fullcolor comecar-festa"><span>Começar uma festa</span><i className="ng-right-arrow-extend"></i></button>
                    <button className="flex flex-space flex-center play-video">
                      <span className="play"></span>
                      <span className="text">Veja nosso vídeo case <strong>Clique para assistir</strong></span>
                    </button>
                </div>
            </div>
        </header>

        <div className="container content">
            <div className="flex flex-space flex-end">
                <div className="flex flex-column icon-text">
                    <div className="icon shadow-20 rounded gradient-roxo">
                        <i className="ng-menu"></i>
                    </div>
                    <p className="title" id="event_type_description"></p>
                </div>
                <div className="swiper-navigation-criar-festa flex flex-space">
                    <button className="gradient fullcolor swiper-prev"><i className="ng-left-arrow-extend"></i></button>
                    <button className="gradient fullcolor swiper-next"><i className="ng-right-arrow-extend"></i></button>
                </div>
            </div>
        </div>

        <div className="swiper-container swiper-criar-festa">
            <div className="swiper-wrapper">
                {
                    current_parties.map( function( item, index ) {
                        setTimeout( function() {
                            $( '#slide-' + index + ' .desc.post_content_parent' ).html( $.parseHTML( item.post_content ) );
                        }, 1000);
                        return <div className="swiper-slide" id={"slide-" + index} >
                            <div className="thumb"><img src={item.post_thumb} /></div>
                            <div className="title">{item.post_title}</div>
                            <div className="more">
                                <div className="subtitle">{item.meta_fields.ntgift_subtitle[0]}</div>
                                <div className="desc post_content_parent" ></div>
                                <Link to="/criarFesta">
                                    <button className="gradient fullcolor">Criar festa</button>
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

        <div className="faca-festa content">
            <div className="container md">
                <div className="flex flex-space">

                    <div className="cards flex flex-space flex-center">
                        <div className="card flex flex-space flex-center">
                            <div className="number">01</div>
                            <div className="icon rounded yellow">
                            </div>
                            <p></p>
                        </div>
                        <div className="card flex flex-space flex-center">
                            <div className="number">02</div>
                            <div className="icon rounded yellow">
                            </div>
                            <p></p>
                        </div>
                        <div className="card flex flex-space flex-center">
                            <div className="number">03</div>
                            <div className="icon rounded yellow">
                            </div>
                            <p></p>
                        </div>
                        <div className="card flex flex-space flex-center">
                            <div className="number">04</div>
                            <div className="icon rounded yellow">
                            </div>
                            <p></p>
                        </div>
                    </div>

                    <div className="flex flex-column icon-text">
                        <div className="icon shadow-20 rounded gradient-roxo">
                            <i className="ng-thumbs-up"></i>
                        </div>
                        <p className="title"><strong>Faça a festa com a NetGift: </strong><br/>é grátis, fácil e divertido!</p>
                        <p className="subtitle">Donec malesuada eleifend lacus aliquet dapibus.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="middle-waves content">
            <div className="container">
                <div className="vantagens flex flex-space">
                    <div className="flex flex-column flex-space">
                        <div className="flex flex-column icon-text">
                            <div className="icon rounded yellow">
                                <i className="ng-sync"></i>
                            </div>
                            <p className="title" id="featured_points_description"></p>
                        </div>
                    </div>

                    <div className="floating">
                        <div className="vantagem flex flex-center">
                            <img src={vantagem_icon_1} alt="site personalizado" />
                            <div className="vantagem-info flex flex-column">
                                <p className="title" id="first_title_feature"></p>
                                <span id="first_content_feature"></span>
                            </div>
                        </div>

                        <div className="vantagem flex flex-center">
                            <img src={vantagem_icon_2} alt="mais organização" />
                            <div className="vantagem-info flex flex-column">
                                <p className="title" id="second_title_feature"></p>
                                <span id="second_content_feature"></span>
                            </div>
                        </div>

                        <div className="vantagem flex flex-center">
                            <img src={vantagem_icon_3} alt="mais mraticidade" />
                            <div className="vantagem-info flex flex-column">
                                <p className="title" id="third_title_feature"></p>
                                <span id="third_content_feature"></span>
                            </div>
                        </div>

                        <div className="vantagem flex flex-center">
                            <img src={vantagem_icon_4} alt="suporte técnico" />
                            <div className="vantagem-info flex flex-column">
                                <p className="title" id="fourth_title_feature"></p>
                                <span id="fourth_content_feature"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="flex flex-space flex-center">
                    <div className="flex flex-column">
                        <div className="flex flex-column icon-text">
                            <div className="icon shadow-20 rounded gradient-roxo">
                                <i className="ng-exit-fullscreen"></i>
                            </div>
                            <p className="title" id="template_attributes_description"></p>
                        </div>
                        <div className="flex flex-column cards-options-template">
                            <div className="card-option active" data-tipo="editavel">
                                <div className="title" id="first_title_template"></div>
                                <div className="desc" id="first_content_template"></div>
                            </div>
                            <div className="card-option" data-tipo="responsivo">
                                <div className="title" id="second_title_template"></div>
                                <div className="desc" id="second_content_template"></div>
                            </div>
                            <div className="card-option" data-tipo="personalizavel">
                                <div className="title" id="third_title_template"></div>
                                <div className="desc" id="third_content_template"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <FooterDesloged />
      </main>
    );
  }
}

const mapStateToProps = state => ({
    home: state.home
})
  

export default connect(mapStateToProps)(HomePage);
