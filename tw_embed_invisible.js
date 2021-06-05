const reg_href = /following|followers$/;
const reg_reply = /^他\d+件の返信$/;

let del_elem_list = [];
let tl_elem = null;

function process(elem)
{
    if( elem.attributes &&
        elem.attributes.href &&
        elem.attributes.href.value.match(reg_href))
    {    
        elem.style.display = 'none';
        // console.log("found");
        return true;
    }
    if( elem.attributes &&
        elem.attributes.role &&
        elem.attributes.role.value == "complementary")
    {
        del_elem_list.push(elem.parentElement);
        return true;
    }
    return false;
}

function explore(elem)
{
    if(process(elem))
    {
        return;
    }
    else
    {
        if(elem.hasChildNodes())
        {
            elem.childNodes.forEach(ch => {
                explore(ch);
            });
        }
    }
}

window.onload = function(){
    const ob = new MutationObserver(function(recs){
        if(tl_elem == null || !document.contains(tl_elem))
        {
            const tl = document.querySelector('h1[aria-level="1"]+div>div') ?? null;
            if(tl)
            {
                tl_elem = tl;
            }
        }

        recs.forEach(rec => {
            if(rec.addedNodes.length > 0)
            {
                rec.addedNodes.forEach(node =>{
                    explore(node);
                })
            }
        });

        if(tl_elem != null)
        {
            if(tl_elem.querySelector('[role="progressbar"]'))
            {
                tl_elem = null;
            }
            else
            {
                tl_elem.childNodes.forEach(elem =>
                    {
                        if(!elem.querySelector('article') &&
                            elem.textContent != "このスレッドを表示" &&
                            elem.textContent.match(reg_reply) == null)
                        {
                            del_elem_list.push(elem);
                        }
                    });
            }
        }

        const a1 = document.querySelector('div[data-testid="sidebarColumn"] [role="region"]');
        if(a1)
        {
            del_elem_list.push(a1.parentElement.parentElement.parentElement)
        }

        if(del_elem_list.length > 0)
        {
            del_elem_list.forEach(elem => {
                if(elem != null)
                {
                    elem.style.display = 'none';
                }
            });
            del_elem_list = []
        }
    });
    const root = document.getElementById('react-root');
    const config = {
        childList: true,
        characterData: true,
        attributes: true,
        subtree: true,
    };
    ob.observe(root, config);
};
