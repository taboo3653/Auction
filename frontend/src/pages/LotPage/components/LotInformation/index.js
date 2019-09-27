import React from 'react'
import Image from 'react-bootstrap/Image'

import "./index.scss"

const LotInformation = () => {
    return (
            <div className = "lot-information">
                <h1>Крутая ваза</h1>
                <div className = "lot-information__image-container">
                    <Image src={require('../../../../assets/img/vase.jpg')} />
                </div>
                <div className = "lot-information__description">
                    <h3>Описание:</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam eget eu diam malesuada convallis ut laoreet est. Duis sed odio diam ut et elit, sagittis mi. Eu nunc commodo consequat nulla pulvinar aliquet aliquet commodo non. Id in gravida eget id. Ipsum a ut mauris magna quam nibh diam amet. Et vestibulum feugiat duis sagittis, scelerisque. Nec, ligula non, pulvinar sit tristique. Nunc orci faucibus neque cursus id. Lectus egestas massa quis elit blandit. Massa praesent nulla mauris ultrices rutrum ipsum. Hendrerit tempus semper sed magna justo, luctus sed metus, est. Suscipit ipsum tristique adipiscing habitant urna nibh. Eget ut augue ut est fusce.
    Orci tempor ac enim, sit nunc at. Massa aliquet ante non ut nulla dapibus. Orci metus donec blandit cras at amet. Donec velit feugiat mattis nisi interdum faucibus semper velit. Mi enim, enim, sit aenean blandit potenti lorem aliquam, id. Sit diam elit massa ac. Molestie sollicitudin euismod sagittis, vestibulum. Magna maecenas risus pharetra nunc duis non enim, amet dui. Imperdiet eros tortor pellentesque sit felis porta id gravida.
    Quisque cursus arcu metus, eros congue. Diam placerat sed nulla cursus odio ultricies nam euismod. Pharetra, neque nulla vitae pellentesque ipsum ultricies. Elementum et massa at amet, imperdiet eu. Cursus quisque porta vitae tellus, cras purus vehicula neque. Nascetur commodo sit varius a, ipsum ac consequat. Quis enim, senectus varius venenatis ornare convallis etiam purus viverra. Euismod massa tempus, non neque ornare nullam in quis.
    Est ut aenean in ac leo nec tincidunt. Sit mauris pulvinar dignissim porttitor. In purus cursus libero varius. Diam sed feugiat venenatis etiam eu vulputate euismod. Eget proin amet est tortor nulla. Tristique diam dictumst tristique eu augue amet, posuere. Aliquam justo congue nulla fermentum facilisi ornare amet. Mauris erat convallis adipiscing ipsum egestas at urna, massa bibendum. Duis lacus non lacus quam. Potenti cursus semper dolor massa viverra sed et sit dignissim. Sit nunc erat cras ultrices tincidunt sodales volutpat diam. Amet turpis morbi varius urna ultrices cras nullam nunc ultrices. Tellus sollicitudin fames tellus ligula aliquet aliquet turpis porttitor nec. Fames cras neque consequat amet, nulla gravida euismod mi.
    Quis at velit lectus elementum massa. Malesuada id nunc pretium scelerisque orci placerat. Proin senectus pellentesque arcu morbi aliquet ultrices id vivamus aliquam. Euismod amet arcu mattis massa nibh. Dolor, nec dignissim molestie cras vitae. Facilisi feugiat parturient luctus vitae at adipiscing ullamcorper risus etiam. Quis turpis odio sem id facilisi. Et dictum lectus vel facilisi eget sit faucibus non.
</p>
                </div>
            </div>
    );
}


export default LotInformation;