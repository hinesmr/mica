#!/usr/bin/env python 
# coding: utf-8

import sys
import multiprocessing
from time import time

sys.path = [".", "jieba"] + sys.path

#print sys.path

import jieba

cpus = multiprocessing.cpu_count()
#print "Testing with " + str(cpus) + " processors."
#jieba.initialize(sqlite = True)
jieba.initialize()
#jieba.enable_parallel(cpus)
#print " ".join(jieba.cut(u"面对新世纪。"))
#print " ".join(jieba.cut(u"国务院在山东"))
ts = time()
text = u"\n今天，真是个野餐的好日子。 猪先生精心打扮着自己，他期待着猪小姐能与他一起去野餐。 “呵呵，真希望她会说‘我愿意’啊。 嗯，我再摘朵花送给她，一定能够打动她！” 路上，猪先生遇到了他的朋友狐狸。狐狸听说了野餐的事，就说：“让我给你一个建议，把我美丽的尾巴借去吧。瞧，你看上去有多聪明啊，猪小姐肯定会喜欢的。” 猪先生很满意。 接着，他又遇到了他的朋友狮子。狮子听说了野餐的事，就说：“让我给你一个建议，把我美丽的头发借去吧。 瞧，你看上去有多威猛啊，猪小姐肯定会喜欢的。” 猪先生很满意。 后来，他又遇到他的朋友斑马。斑马听说了野餐的事，就说：“让我给你一个建议，把我美丽的条纹借去吧。 瞧，你看上去有多英俊啊，猪小姐肯定会喜欢的。” 猪先生很满意。他觉得自己从来没有这样英俊过。 终于来到猪小姐家了，猪先生激动地敲了敲门。“能有幸请你一起去野餐吗？”他问。 猪小姐吓了一大跳：“噢，不行！你是哪儿来的妖怪呀？你要是再不走开，我就去叫猪先生了，他会来收拾你的！” 猪先生连忙往回跑。一路上，他把条纹还给了斑马，把头发还给了狮子，把尾巴还给了狐狸。然后，他又赶回到猪小姐的家，再一次摁响了门铃。 “能有幸请你一起去野餐吗？”他又问。 “啊呀，猪先生！” 猪小姐叫道，“看到你我真是太高兴啦，我很愿意跟你一起去野餐。刚才来了个丑八怪，就站在我的院子里，可把我吓坏啦。” 一路上，猪小姐把那个丑八怪的故事仔细地讲给了猪先生。她英俊的朋友猪先生，则一直满怀同情地听着。这真是一个去野餐的好日子啊\n"
#print "test text:"
#print text
jieba.cut(text)
print "Parse Time: " + str(time() - ts) + " seconds"
import os
_proc_status = '/proc/%d/status' % os.getpid()

_scale = {'kB': 1024.0, 'mB': 1024.0*1024.0,
          'KB': 1024.0, 'MB': 1024.0*1024.0}

def _VmB(VmKey):
    '''Private.
    '''
    global _proc_status, _scale
     # get pseudo file  /proc/<pid>/status
    try:
        t = open(_proc_status)
        v = t.read()
        t.close()
    except:
        return 0.0  # non-Linux?
     # get VmKey line e.g. 'VmRSS:  9999  kB\n ...'
    i = v.index(VmKey)
    v = v[i:].split(None, 3)  # whitespace
    if len(v) < 3:
        return 0.0  # invalid format?
     # convert Vm value to bytes
    return float(v[1]) * _scale[v[2]]


def memory(since=0.0):
    '''Return memory usage in bytes.
    '''
    return _VmB('VmSize:') - since


def resident(since=0.0):
    '''Return resident memory usage in bytes.
    '''
    return _VmB('VmRSS:') - since


def stacksize(since=0.0):
    '''Return stack size in bytes.
    '''
    return _VmB('VmStk:') - since

print "Memory usage: " + str(resident() / 1024/1024) + " MB"
