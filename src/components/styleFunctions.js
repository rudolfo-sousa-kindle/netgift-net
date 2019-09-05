export const bgImage = (src) => ({
       backgroundImage: 'url(' + src + ')'
     });

export const bgColor = (color) => ({
    backgroundColor: '#' + color
  });
  
export const color = (color) => ({
    color: '#' + color
  });

export const textAlign = (align) => ({
    textAlign: align
  });
  
export const fontSize = (size) => ({
    fontSize: size + "px"
  });
  
  export const border = (border) => ({
    border: border
  });

export const displayNone = {
    "display": "none"
}

export const setStyle = (styles) => {
  var color;
  var backgroundColor;
  var textAlign;
  var fontSize;
  var fontWeight;
  var fontStyle;
  var fontFamily;
  var border;
  var textDecoration;

  if(styles.texto_fonte_cor){
    color = styles.texto_fonte_cor
  }else{
    color = "#000000"
  }

  if(styles.texto_fonte_tamanho){
    fontSize = styles.texto_fonte_tamanho + "px"
  }else{
    fontSize = "16px"
  }

  if(styles.texto_fundo_cor){
    backgroundColor = styles.texto_fundo_cor
  }else{
    backgroundColor = ""
  }

  if(styles.alinhamento){
    textAlign = styles.alinhamento
  }else{
    textAlign = ""
  }
  
  if(styles.negrito){
    fontWeight = "bold"
  }else{
    fontWeight = "400"
  }

  if(styles.italico){
    textDecoration = "itallic"
  }else{
    textDecoration = "none"
  }

  if(styles.sublinhado){
    fontStyle = "itallic"
  }else{
    fontStyle = "none"
  }

  const style = {
    color: color,
    fontSize: fontSize,
    backgroundColor: backgroundColor,
    textAlign: textAlign,
    fontWeight: fontWeight,
    textDecoration: textDecoration,
    fontStyle: fontStyle
  }

  return style;

}

export const defaultStyle = (styles) => {
    var color;
    var backgroundColor;
    var textAlign;
    var fontSize;
    var fontWeight;
    var fontStyle;
    var fontFamily;
    var border;
    var textDecoration;
    var backgroundImage;
    var backgroundSize;

    if(styles.color){
         color = styles.color
    }else{
        color = "#000000"
    }

    if(styles.backgroundColor){
      backgroundColor = styles.backgroundColor
    }else{
      backgroundColor = "none"
    }

    if(styles.backgroundSize){
      backgroundSize = styles.backgroundSize
    }else{
      backgroundSize = "cover"
    }

    if(styles.backgroundImage){
      backgroundImage =  `url(${styles.backgroundImage})`
    }else{
      backgroundImage = "url(/static/media/thumb-template.97538df7.svg);"
    }

    if(styles.fontSize){
        fontSize = styles.fontSize + "px"
   }else{
        fontSize = "16px"
   }

   if(styles.textAlign){
    textAlign = styles.textAlign
    }else{
      textAlign = "center"
    }

    if(styles.border){
      border = styles.border
    }else{
      border = "none"
    }

    if(styles.fontWeight){
      fontWeight = styles.fontWeight
    }else{
      fontWeight = "400"
    }

    if(styles.fontStyle){
      fontStyle = styles.fontStyle
    }else{
      fontStyle = "normal"
    }

    if(styles.textDecoration){
      textDecoration = styles.textDecoration
    }else{
      textDecoration = "none"
    }

    if(styles.fontFamily){
      fontFamily = styles.fontFamily
    }else{
      fontFamily = "'Museo Sans', sans-serif"
    }


    const style = {
      color: color,
      fontSize: fontSize,
      textAlign: textAlign,
      backgroundColor: backgroundColor,
      backgroundImage: backgroundImage,
      border: border,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textDecoration: textDecoration,
      fontFamily: fontFamily,
      backgroundSize: backgroundSize
    }

    return style;
 
}