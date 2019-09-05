import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPage } from "../actions";

import HeaderDefault from "../components/HeaderDefault.js";
import FooterDesloged from "../components/FooterDesloged.js";
import Swiper from 'swiper';

import $ from 'jquery';


import "../assets/css/sobre-responsive.css"

import quote from  '../assets/imgs/quote.png';

class Sobre extends Component {

    componentDidMount() {
        $( 'body' ).attr( 'class', 'page-sobre' );
        this.props.dispatch(fetchPage(120, 'ntgift_testimonials'));
        
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            slideToClickedSlide: true,
            initialSlide: -1,
            slidesOffsetBefore: -273,
            centeredSlides: true,
            roundLengths: true,
            // spaceBetween: 30,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination-depoimentos',
                clickable: true,
            },
            breakpoints: {
                // when window width is <= 640px
                600: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 0,
                    initialSlide: 0,
                    invert: true,
                    centeredSlides: false,
                },
                900: {
                    slidesPerView: 2,
                    slidesOffsetBefore: 0,
                    initialSlide: 0,
                    invert: true,
                    centeredSlides: false,
                },
                1024: {
                    slidesPerView: 2,
                    slidesOffsetBefore: 30,
                    initialSlide: 0,
                    centeredSlides: false,
                }
            }
        });
    }


    render() {
        const { error, loading, page } = this.props;
        const { items } = page;
        const { meta_fields } = items;
        const { ntgift_testimonials } = items;

        let current_testimonials = [];
        
        if ( undefined !== meta_fields && items.ID == 120 ) {
            $('.icon-page-1').html(meta_fields.ntgift_section_1_icon);
            $('.icon-page-2').html(meta_fields.ntgift_section_2_icon);
            $('.icon-page-3').html(meta_fields.ntgift_testimonies_icon);
            $('.icon-page-4').html(meta_fields.ntgift_start_party_icon);

            $('.text-edit-1').html(meta_fields.ntgift_section_1_texto);
            $('.text-edit-2').html(meta_fields.ntgift_section_2_texto);

            $('.sobre_img_1').attr('src',meta_fields.ntgift_section_1_imagem_lateral);
            $('.sobre_mobile_1').attr('src',meta_fields.ntgift_section_1_imagem_mobile_1);
            $('.sobre_img_2').attr('src',meta_fields.ntgift_section_2_imagem_lateral);
            $('.sobre_mobile_2').attr('src',meta_fields.ntgift_section_1_imagem_mobile_2);

            $('.ntgift_testimonies_title').html(meta_fields.ntgift_testimonies_title);
            $('.ntgift_testimonies_description').html(meta_fields.ntgift_testimonies_description);
            $('.ntgift_start_party_description').html(meta_fields.ntgift_start_party_description);

            $('.sobre header.wave').css({
                'background-image': 'url(' + items.thumbnail + ')'
            });
        }

        if ( undefined !== ntgift_testimonials ) {
            current_testimonials = ntgift_testimonials;
        }

        setTimeout(function() {
            var mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                slideToClickedSlide: true,
                initialSlide: -1,
                slidesOffsetBefore: -273,
                centeredSlides: true,
                roundLengths: true,
                // spaceBetween: 30,
                grabCursor: true,
                pagination: {
                    el: '.swiper-pagination-depoimentos',
                    clickable: true,
                },
                breakpoints: {
                    // when window width is <= 640px
                    600: {
                        slidesPerView: 1,
                        slidesOffsetBefore: 0,
                        initialSlide: 0,
                        invert: true,
                        centeredSlides: false,
                    },
                    900: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 0,
                        initialSlide: 0,
                        invert: true,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 30,
                        initialSlide: 0,
                        centeredSlides: false,
                    }
                }
            });
        }, 1500);

        return (
            <main className="sobre">
                <header className="default wave">
                    <div className="container lg">
                        <HeaderDefault  />
                    </div>

                    <div className="container content">
                        <div className="flex flex-column header-content">
                            <h2 className="title">{items.post_title}</h2>
                            <p className="subtitle">{items.post_content}</p>
                        </div>
                    </div>
                </header>

                <div className="container md content">
                    <div className="flex flex-space flex-center sobre-1">
                        <div className="sobre-img-mob">
                            <img src="" className="img2 sobre_mobile_1" alt="Crie, divulgue, comemore." />
                        </div>

                        <div className="flex flex-column icon-text md text-edit-1">
                            <div className="icon shadow-20 rounded gradient-roxo icon-page-1">
                            </div>
                        </div>

                        <div className="sobre-img">
                            <img src="" className="img1 sobre_img_1" alt="Crie, divulgue, comemore." />
                            <img src="" className="img2 sobre_mobile_2" alt="Crie, divulgue, comemore." />
                        </div>
                    </div>

                    <div className="flex flex-space flex-center sobre-2">

                        <div className="sobre-img">
                            <img src="" className="sobre_img_2" alt=""/>
                        </div>

                        <div className="flex flex-column icon-text md text-edit-2">
                            <div className="icon shadow-20 rounded gradient-roxo icon-page-2">
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-space flex-end">
                        <div className="flex flex-column icon-text lg">
                            <div className="icon shadow-20 rounded gradient-roxo icon-page-3">
                            </div>
                            <p className="title ntgift_testimonies_title"></p>
                            <p className="subtitle ntgift_testimonies_description"></p>
                        </div>

                        <img src={quote} className="mob-hide" alt="" />
                    </div>
                </div>

                <div className="depoimentos">
                    <div className="swiper-container" dir="">
                        <div className="swiper-wrapper">
                            {
                                current_testimonials.map(function(item, index) {
                                    return <div key={item.ID} className="swiper-slide card-depoimento" id={"slide-" + index}>
                                    <div className="card-depoimento-content flex flex-column flex-center">
                                        <div className="user-img"><img src={item.post_thumb} alt=""/></div>
                                        <div className="user-name">{item.post_title}</div>
                                        <div className="user-title">{item.post_excerpt}</div>
                                        <p className="user-desc">{item.post_content}</p>
                                    </div>
                                </div>
                                })
                            }
                            
                        </div>
                        <div className="swiper-pagination swiper-pagination-depoimentos" dir="ltr"></div>
                    </div>
                </div>

                <div className="container md waves-mob">
                    <div className="flex flex-space flex-end">

                        <div className="flex flex-column icon-text lg">
                            <div className="icon shadow-20 rounded gradient-roxo icon-page-4">
                            </div>
                            <p className="title ntgift_start_party_description"></p>
                            <p className="subtitle"></p>
                            <Link to="/login">
                                <button className="gradient fullcolor comecar-festa"><span>Começar uma festa</span><i className="ng-right-arrow-extend"></i></button>
                            </Link>
                        </div>
                    </div>
                </div>

                <FooterDesloged />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    page: state.page
})
  

export default connect(mapStateToProps)(Sobre);