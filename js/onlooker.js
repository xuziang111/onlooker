function disableMouseDrag(e){
    e.stopPropagation();
}

function showStoryNodeWindow(e){
    const datas = onlookerLiveData[e.target.getAttribute('node-code')];
    document.getElementById('record-win-title').innerText = e.target.title;
    const content = document.getElementById('record-win-content');
    content.innerHTML = '';
    for(let i=0;i<datas.length;i++){
        const data = datas[i];
        const item = document.createElement('a');
        item.className = 'record-item';
        item.href = data.link;
        item.target = '_blank';
        for(let j=0;j<data.livers.length;j++){
            const liver = onlookerLiveData[data.livers[j]];
            const avatar = document.createElement('img');
            avatar.className = 'record-item-avatar';
            avatar.src = liver.avatar;
            avatar.alt = liver.name;
            item.append(avatar);
        }
        const text = document.createElement('div');
        text.className = 'record-item-text';
        text.append(buildTextSpan('record-item-title', data.title));
        text.append(buildTextSpan('record-item-subtitle', data.subtitle));
        item.append(text);
        content.append(item);
    }
    window.location.hash = '#record-win';
}

function buildTextSpan(className, text){
    const span = document.createElement('span');
    span.className = className;
    span.innerText = text;
    return span;
}

function loadStoryTree(){
    const story = document.getElementById('story');
    story.append(buildStoryNode(onlookerStoryData));
    const subStorys = document.createElement('div');
    subStorys.className = 'sub-storys';
    story.append(subStorys);
    appendStoryTreeNode(subStorys, onlookerStoryData.children);
}

function buildStoryNode(storyNodeData){
    const storyNode = document.createElement('img');
    storyNode.className = 'story-node';
    storyNode.title = storyNodeData.title;
    storyNode.setAttribute('node-code', storyNodeData.code);
    storyNode.addEventListener('mousedown', disableMouseDrag);
    storyNode.addEventListener('click', showStoryNodeWindow);
    storyNode.src = storyNodeData.img;
    storyNode.loading = 'lazy';
    return storyNode;
}

function appendStoryTreeNode(parentNode, childrenNode){
    for (let index = 0; index < childrenNode.length; index++) {
        const childNode = childrenNode[index];
        const subStory = document.createElement('div');
        subStory.className = childrenNode.length>1?'sub-story':'sub-story sole';
        subStory.append(buildStoryNode(childNode));
        if(childNode.children){
            const subStorys = document.createElement('div');
            subStorys.className = 'sub-storys';
            appendStoryTreeNode(subStorys, childNode.children);
            subStory.append(subStorys);
        }
        parentNode.append(subStory);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadStoryTree();
    const ele = document.body;
    ele.scrollTo(0, (ele.scrollHeight - ele.clientHeight)/2);
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            x: e.clientX,
            y: e.clientY
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function() {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    ele.addEventListener('mousedown', mouseDownHandler);

    if(document.cookie.indexOf('onlookerNoticed') === -1){
        window.location.hash = '#steam-record-win';
        document.cookie = 'onlookerNoticed=1; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    }
});